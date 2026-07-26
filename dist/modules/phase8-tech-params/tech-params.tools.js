var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, Widget, z, Injectable } from '@nitrostack/core';
import { MemoryStore } from '../../core/memory/memory.store.js';
import { SemanticScholarService } from '../../core/services/semantic-scholar.service.js';
import { generateId } from '../../utils/id-generator.js';
/**
 * Phase 8: Technical Parameter Extractor (Stretch, for engineering topics)
 *
 * Extracts detailed technical parameters from papers (sensors, sampling rates, hardware, etc.)
 */
let TechParamsTools = class TechParamsTools {
    memory;
    semanticScholar;
    constructor(memory, semanticScholar) {
        this.memory = memory;
        this.semanticScholar = semanticScholar;
    }
    async extractTechnicalParameters(input, ctx) {
        const { paperId, fullText, sessionId } = input;
        ctx.logger.info('Extracting technical parameters', { paperId });
        const params = this.extractParams(fullText, paperId);
        if (sessionId) {
            this.memory.addTechnicalParams(sessionId, [params]);
        }
        return params;
    }
    extractParams(text, paperId) {
        const lower = text.toLowerCase();
        // Sensors
        const sensors = [];
        const sensorKeywords = [
            'accelerometer', 'gyroscope', 'ecg', 'eeg', 'emg', 'ppg',
            'camera', 'lidar', 'radar', 'microphone', 'thermometer',
            'pressure sensor', 'temperature sensor', 'force sensor',
            'inertial measurement unit', 'imu', 'gps', 'magnetic sensor',
            'proximity sensor', 'ultrasonic', 'infrared', 'rgb-d',
        ];
        for (const kw of sensorKeywords) {
            if (lower.includes(kw))
                sensors.push(kw);
        }
        // Sampling rate
        let samplingRateHz;
        const srMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:Hz|kHz|MHz|GHz)/i);
        if (srMatch) {
            const val = parseFloat(srMatch[1]);
            const unit = srMatch[0].toLowerCase();
            if (unit.includes('khz'))
                samplingRateHz = val * 1000;
            else if (unit.includes('mhz'))
                samplingRateHz = val * 1000000;
            else if (unit.includes('ghz'))
                samplingRateHz = val * 1000000000;
            else
                samplingRateHz = val;
        }
        // Dataset size
        let datasetSize;
        const dsMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:samples|images|recordings|examples|patients|participants|subjects|frames)/i);
        if (dsMatch) {
            datasetSize = parseInt(dsMatch[1].replace(/,/g, ''), 10);
        }
        // Hardware platform
        const hardwareKeywords = ['fpga', 'asic', 'gpu', 'cpu', 'tpu', 'microcontroller', 'mcu', 'raspberry pi', 'arduino', 'jetson', 'edge device', 'mobile', 'embedded'];
        let hardwarePlatform;
        for (const kw of hardwareKeywords) {
            if (lower.includes(kw)) {
                hardwarePlatform = kw.toUpperCase();
                break;
            }
        }
        // Power budget
        let powerBudgetMw;
        const pwrMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:mW|milliwatt|μW|uW|W)/i);
        if (pwrMatch) {
            const val = parseFloat(pwrMatch[1]);
            const unit = pwrMatch[0].toLowerCase();
            if (unit.includes('μw') || unit.includes('uw'))
                powerBudgetMw = val / 1000;
            else if (unit === 'w')
                powerBudgetMw = val * 1000;
            else
                powerBudgetMw = val;
        }
        // Latency
        let latencyMs;
        const latMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:ms|millisecond)/i);
        if (latMatch)
            latencyMs = parseFloat(latMatch[1]);
        // Throughput
        let throughput;
        const tpMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:fps|frames per second|samples per second|Hz)/i);
        if (tpMatch)
            throughput = `${tpMatch[1]} ${tpMatch[2]}`;
        return {
            paramsId: generateId('params'),
            paperId,
            sensors: [...new Set(sensors)],
            samplingRateHz,
            datasetSize,
            hardwarePlatform,
            powerBudgetMw,
            latencyMs,
            throughput,
            other: {},
            extractedAt: new Date().toISOString(),
        };
    }
    async compareTechnicalParameters(input, ctx) {
        const { sessionId } = input;
        const allParams = this.memory.getTechnicalParams(sessionId);
        if (allParams.length === 0) {
            return { sessionId, parameterCount: 0, message: 'No technical parameters extracted yet' };
        }
        // Group by parameter type
        const sensors = new Set();
        let hasSamplingRate = false;
        let hasDatasetSize = false;
        let hasPowerBudget = false;
        const platforms = new Set();
        for (const params of allParams) {
            params.sensors.forEach(s => sensors.add(s));
            if (params.samplingRateHz)
                hasSamplingRate = true;
            if (params.datasetSize)
                hasDatasetSize = true;
            if (params.powerBudgetMw)
                hasPowerBudget = true;
            if (params.hardwarePlatform)
                platforms.add(params.hardwarePlatform);
        }
        return {
            sessionId,
            paperCount: [...new Set(allParams.map(p => p.paperId))].length,
            sensors: Array.from(sensors),
            hasSamplingRate,
            hasDatasetSize,
            hasPowerBudget,
            platforms: Array.from(platforms),
            parameters: allParams,
        };
    }
    async fetchAndExtractTechParams(input, ctx) {
        const { paperId, sessionId } = input;
        ctx.logger.info('Fetching and extracting tech params', { paperId });
        // Fetch full text
        const fetchResult = await this.semanticScholar.getPaper(paperId);
        if (!fetchResult?.isOpenAccess || !fetchResult.pdfUrl) {
            throw new Error(`Paper ${paperId} not open access or no PDF URL`);
        }
        // Fetch PDF and parse
        const response = await fetch(fetchResult.pdfUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfParse = await import('pdf-parse');
        const data = await pdfParse.default(buffer);
        if (!data.text || data.text.length < 100) {
            throw new Error('Could not extract text from PDF');
        }
        // Extract parameters
        return this.extractTechnicalParameters({
            paperId,
            fullText: data.text,
            sessionId,
        }, ctx);
    }
};
__decorate([
    Tool({
        name: 'extract_technical_parameters',
        description: 'Extract detailed technical parameters from a paper full text',
        inputSchema: z.object({
            paperId: z.string().describe('Paper ID'),
            fullText: z.string().describe('Full paper text'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Extracting technical parameters from paper...',
            invoked: 'Technical parameter extraction complete'
        },
        examples: {
            request: { paperId: 'p1', fullText: 'We use 8x A100 GPUs with NVLink. The accelerometer samples at 100 Hz. Dataset contains 10,000 samples.' },
            response: { paramsId: 'tp1', paperId: 'p1', sensors: ['accelerometer'], samplingRateHz: 100, datasetSize: 10000, hardwarePlatform: 'GPU', powerBudgetMw: undefined, latencyMs: undefined, throughput: undefined, extractedAt: '2026-07-26T10:00:00Z' }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TechParamsTools.prototype, "extractTechnicalParameters", null);
__decorate([
    Tool({
        name: 'compare_technical_parameters',
        description: 'Compare technical parameters across papers',
        inputSchema: z.object({
            sessionId: z.string().describe('Session ID'),
        }),
        invocation: {
            invoking: 'Comparing technical parameters across papers...',
            invoked: 'Technical parameter comparison complete'
        },
        examples: {
            request: { sessionId: 'sess_001' },
            response: { sessionId: 'sess_001', paperCount: 3, sensors: ['accelerometer', 'gyroscope'], hasSamplingRate: true, hasDatasetSize: true, hasPowerBudget: false, platforms: ['GPU', 'FPGA'], parameters: [] }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TechParamsTools.prototype, "compareTechnicalParameters", null);
__decorate([
    Tool({
        name: 'fetch_and_extract_tech_params',
        description: 'Fetch full text and extract technical parameters in one call',
        inputSchema: z.object({
            paperId: z.string().describe('Semantic Scholar paper ID'),
            sessionId: z.string().optional().describe('Session ID to store results'),
        }),
        invocation: {
            invoking: 'Fetching full text and extracting technical parameters...',
            invoked: 'Full text fetched and technical parameters extracted'
        },
        examples: {
            request: { paperId: 'p123', sessionId: 'sess_001' },
            response: { paramsId: 'tp1', paperId: 'p123', sensors: ['accelerometer'], samplingRateHz: 100, datasetSize: 10000, hardwarePlatform: 'GPU', powerBudgetMw: undefined, latencyMs: undefined, throughput: undefined, extractedAt: '2026-07-26T10:00:00Z' }
        }
    }),
    Widget('research-pilot-shell'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TechParamsTools.prototype, "fetchAndExtractTechParams", null);
TechParamsTools = __decorate([
    Injectable({ deps: [MemoryStore, SemanticScholarService] }),
    __metadata("design:paramtypes", [MemoryStore,
        SemanticScholarService])
], TechParamsTools);
export { TechParamsTools };
//# sourceMappingURL=tech-params.tools.js.map
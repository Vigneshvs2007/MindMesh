'use client';
import { useState, useEffect, useMemo } from 'react';
import { DESIGN, PHASE_GROUPS, getPhaseColor, getPhaseInfo } from '../components/design-tokens';
import { PhaseBadge, ToolChip, StatusDot, Card, Input, Button } from '../components/ui';
const MOCK_CONVERSATIONS = [
    {
        id: 'conv-001',
        title: 'Federated Learning Privacy Research',
        topic: 'federated learning privacy',
        phase: 6,
        status: 'completed',
        messages: 24,
        lastMessage: 'Final verdict: PASS — Adaptive DP with dynamic budget allocation',
        updatedAt: '2026-07-25T22:30:00Z',
        papers: 14,
        gapsFound: 5,
    },
    {
        id: 'conv-002',
        title: 'Efficient Attention for Long Sequences',
        topic: 'linear attention mechanisms',
        phase: 3,
        status: 'in-progress',
        messages: 12,
        lastMessage: 'Clustering complete — 5 clusters identified across 18 papers',
        updatedAt: '2026-07-25T18:15:00Z',
        papers: 18,
        gapsFound: 3,
    },
    {
        id: 'conv-003',
        title: 'Byzantine-Robust FL Aggregation',
        topic: 'byzantine federated learning',
        phase: 4,
        status: 'review',
        messages: 18,
        lastMessage: 'Gap proposed: Unified Byzantine+DP framework with formal composition',
        updatedAt: '2026-07-24T14:20:00Z',
        papers: 11,
        gapsFound: 2,
    },
    {
        id: 'conv-004',
        title: 'Cross-Domain Analogues for FL',
        topic: 'cross-domain federated learning',
        phase: 7,
        status: 'completed',
        messages: 8,
        lastMessage: 'Found 3 analogies: gossip protocols, consensus, epidemic modeling',
        updatedAt: '2026-07-23T10:00:00Z',
        papers: 6,
        gapsFound: 1,
    },
    {
        id: 'conv-005',
        title: 'Technical Parameters: GPU Clusters',
        topic: 'distributed training hardware',
        phase: 8,
        status: 'in-progress',
        messages: 5,
        lastMessage: 'Extracting parameters from 12 hardware papers',
        updatedAt: '2026-07-22T16:45:00Z',
        papers: 12,
        gapsFound: 0,
    },
];
const MOCK_MESSAGES = {
    'conv-001': [
        { id: 'msg-1', role: 'user', content: 'Search for federated learning privacy papers from 2020+', timestamp: '2026-07-25T22:00:00Z', phase: 0 },
        { id: 'msg-2', role: 'assistant', content: 'Found 14 papers (2020-2024). Top venues: IEEE S&P, ACM CCS, NeurIPS, ICML, USENIX Security.', timestamp: '2026-07-25T22:00:15Z', phase: 0, tool: 'search_prior_work' },
        { id: 'msg-3', role: 'user', content: 'Extract claims and methodologies from all papers', timestamp: '2026-07-25T22:05:00Z', phase: 2 },
        { id: 'msg-4', role: 'assistant', content: 'Extracted 47 claims across 14 papers. Types: 18 methods, 12 findings, 9 limitations, 8 assumptions.', timestamp: '2026-07-25T22:06:30Z', phase: 2, tool: 'extract_paper_claims' },
        { id: 'msg-5', role: 'user', content: 'Cluster papers and find contradictions', timestamp: '2026-07-25T22:10:00Z', phase: 3 },
        { id: 'msg-6', role: 'assistant', content: '4 clusters identified. 5 contradictions found (2 high severity). Key conflict: Central DP vs Local DP utility tradeoff.', timestamp: '2026-07-25T22:11:45Z', phase: 3, tool: 'cluster_papers' },
        { id: 'msg-7', role: 'user', content: 'Propose research gaps', timestamp: '2026-07-25T22:15:00Z', phase: 4 },
        { id: 'msg-8', role: 'assistant', content: 'Proposed 5 gaps. Top: Adaptive DP with dynamic per-client budget allocation (novelty 85, feasibility 78, impact 88).', timestamp: '2026-07-25T22:16:20Z', phase: 4, tool: 'propose_gap' },
        { id: 'msg-9', role: 'user', content: 'Run adversarial review cycle', timestamp: '2026-07-25T22:20:00Z', phase: 5 },
        { id: 'msg-10', role: 'assistant', content: 'Review cycle complete. Iteration 1: OBJECTION (dynamic sensitivity estimation leaks). Iteration 2: PASS. Iteration 3: PASS. Final: PASS.', timestamp: '2026-07-25T22:25:00Z', phase: 5, tool: 'run_gap_review_cycle' },
        { id: 'msg-11', role: 'assistant', content: 'Final verdict: PASS. Resilience score: 87/100. Ready for paper drafting.', timestamp: '2026-07-25T22:28:00Z', phase: 6, tool: 'render_verdict' },
    ],
    'conv-002': [
        { id: 'msg-1', role: 'user', content: 'Find papers on linear attention and efficient transformers', timestamp: '2026-07-25T18:00:00Z', phase: 1 },
        { id: 'msg-2', role: 'assistant', content: 'Found 18 papers covering FlashAttention, Linear Attention, Performer, Reformer, and more.', timestamp: '2026-07-25T18:00:30Z', phase: 1, tool: 'search_papers' },
        { id: 'msg-3', role: 'user', content: 'Score relevance for long sequence modeling (>4k tokens)', timestamp: '2026-07-25T18:05:00Z', phase: 1 },
        { id: 'msg-4', role: 'assistant', content: 'Scored 18 papers. Top: FlashAttention-2 (95), Linear Attention (89), Performer (82).', timestamp: '2026-07-25T18:06:00Z', phase: 1, tool: 'score_paper_relevance' },
        { id: 'msg-5', role: 'user', content: 'Extract claims from top 10 papers', timestamp: '2026-07-25T18:10:00Z', phase: 2 },
        { id: 'msg-6', role: 'assistant', content: 'Extracted 34 claims. Methods: 14, Findings: 10, Limitations: 6, Assumptions: 4.', timestamp: '2026-07-25T18:11:30Z', phase: 2, tool: 'extract_paper_claims' },
        { id: 'msg-7', role: 'user', content: 'Cluster by methodology type', timestamp: '2026-07-25T18:15:00Z', phase: 3 },
    ],
    'conv-003': [
        { id: 'msg-1', role: 'user', content: 'Search for Byzantine-robust federated learning aggregation', timestamp: '2026-07-24T14:00:00Z', phase: 1 },
        { id: 'msg-2', role: 'assistant', content: 'Found 11 papers on Krum, Trimmed Mean, Median, Bulyan, and recent variants.', timestamp: '2026-07-24T14:00:45Z', phase: 1, tool: 'search_papers' },
        { id: 'msg-3', role: 'user', content: 'Extract claims and find contradictions', timestamp: '2026-07-24T14:05:00Z', phase: 2 },
        { id: 'msg-4', role: 'assistant', content: '28 claims extracted. 3 contradictions around convergence guarantees under non-IID data.', timestamp: '2026-07-24T14:07:00Z', phase: 3, tool: 'find_contradictory_claims' },
        { id: 'msg-5', role: 'user', content: 'Propose gap: Byzantine + DP combined', timestamp: '2026-07-24T14:10:00Z', phase: 4 },
        { id: 'msg-6', role: 'assistant', content: 'Proposed 2 gaps. Top: Unified Byzantine+DP framework with formal composition (novelty 82, feasibility 75, impact 85).', timestamp: '2026-07-24T14:12:00Z', phase: 4, tool: 'propose_gap' },
        { id: 'msg-7', role: 'user', content: 'Run adversarial review', timestamp: '2026-07-24T14:15:00Z', phase: 5 },
        { id: 'msg-8', role: 'assistant', content: 'Iteration 1 OBJECTION: Composition theorem assumptions may not hold. Iteration 2: Under review...', timestamp: '2026-07-24T14:18:00Z', phase: 5, tool: 'run_gap_review_cycle' },
    ],
    'conv-004': [
        { id: 'msg-1', role: 'user', content: 'Find cross-domain analogies for federated learning privacy', timestamp: '2026-07-23T09:30:00Z', phase: 7 },
        { id: 'msg-2', role: 'assistant', content: 'Searching domains: distributed systems, epidemiology, cryptography, game theory...', timestamp: '2026-07-23T09:31:00Z', phase: 7, tool: 'find_cross_domain_analogs' },
        { id: 'msg-3', role: 'assistant', content: 'Found 3 analogies: 1) Gossip protocols (epidemic spread), 2) Byzantine consensus (fault tolerance), 3) Differential privacy (epidemic privacy).', timestamp: '2026-07-23T09:35:00Z', phase: 7, tool: 'find_cross_domain_analogs' },
        { id: 'msg-4', role: 'user', content: 'Verify technique match for gossip protocols', timestamp: '2026-07-23T09:40:00Z', phase: 7 },
        { id: 'msg-5', role: 'assistant', content: 'Gossip protocols transferable: probabilistic dissemination matches FL round structure. Match confidence: 88%.', timestamp: '2026-07-23T09:42:00Z', phase: 7, tool: 'verify_technique_match' },
    ],
    'conv-005': [
        { id: 'msg-1', role: 'user', content: 'Extract technical parameters for distributed GPU training', timestamp: '2026-07-22T16:30:00Z', phase: 8 },
        { id: 'msg-2', role: 'assistant', content: 'Scanning 12 papers for hardware specs, bandwidth, cluster topology...', timestamp: '2026-07-22T16:31:00Z', phase: 8, tool: 'fetch_and_extract_tech_params' },
        { id: 'msg-3', role: 'assistant', content: 'Extracted from 8 papers. Common: 8xA100, NVLink, 400Gbps InfiniBand, 1-2TB model sizes.', timestamp: '2026-07-22T16:38:00Z', phase: 8, tool: 'extract_technical_parameters' },
        { id: 'msg-4', role: 'user', content: 'Compare parameters across papers', timestamp: '2026-07-22T16:40:00Z', phase: 8 },
        { id: 'msg-5', role: 'assistant', content: 'Parameter comparison complete. Key variance: Interconnect topology (NVLink vs InfiniBand) drives 2-3x throughput difference.', timestamp: '2026-07-22T16:45:00Z', phase: 8, tool: 'compare_technical_parameters' },
    ],
};
function formatTime(iso) {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1)
        return 'now';
    if (diffMins < 60)
        return `${diffMins}m`;
    if (diffHours < 24)
        return `${diffHours}h`;
    if (diffDays < 7)
        return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function getStatusColor(status) {
    switch (status) {
        case 'completed': return DESIGN.colors.green;
        case 'in-progress': return DESIGN.colors.blue;
        case 'review': return DESIGN.colors.phaseStretch;
        case 'error': return DESIGN.colors.red;
        default: return DESIGN.colors.fgDim;
    }
}
export default function ChatHistorySidebar() {
    const [state, setState] = useState({
        conversations: MOCK_CONVERSATIONS,
        activeConversation: null,
        searchQuery: '',
        phaseFilter: null,
        selectedConversation: null,
        isLoading: false,
    });
    // Initialize from widget data (in real implementation, use useWidgetState)
    useEffect(() => {
        // In production: const data = useWidgetState<WidgetData>();
        // setState(prev => ({ ...prev, ...data }));
        setState(prev => ({ ...prev, isLoading: false }));
    }, []);
    const filteredConversations = useMemo(() => {
        let result = state.conversations;
        if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase().trim();
            result = result.filter(c => c.title.toLowerCase().includes(query) ||
                c.topic.toLowerCase().includes(query) ||
                c.lastMessage.toLowerCase().includes(query));
        }
        if (state.phaseFilter !== null) {
            result = result.filter(c => c.phase === state.phaseFilter);
        }
        return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }, [state.conversations, state.searchQuery, state.phaseFilter]);
    const handleSearchChange = (e) => {
        setState(prev => ({ ...prev, searchQuery: e.target.value }));
    };
    const handlePhaseFilterChange = (phase) => {
        setState(prev => ({ ...prev, phaseFilter: phase }));
    };
    const handleConversationClick = (conversation) => {
        setState(prev => ({
            ...prev,
            activeConversation: conversation.id,
            selectedConversation: conversation,
        }));
        // In production: useWidgetSDK().postMessage({ type: 'conversation_selected', data: conversation });
    };
    const handleNewConversation = () => {
        // In production: useWidgetSDK().postMessage({ type: 'new_conversation' });
        console.log('New conversation requested');
    };
    const selectedMessages = state.selectedConversation
        ? MOCK_MESSAGES[state.selectedConversation.id] || []
        : [];
    return (<div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
            maxWidth: 420,
            backgroundColor: DESIGN.colors.bg,
            borderRight: `1px solid ${DESIGN.colors.border}`,
            fontFamily: DESIGN.fonts.sans,
            color: DESIGN.colors.fg,
            overflow: 'hidden',
            position: 'relative',
        }}>
      {/* Header */}
      <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${DESIGN.spacing.md}px ${DESIGN.spacing.lg}px`,
            borderBottom: `1px solid ${DESIGN.colors.border}`,
            backgroundColor: DESIGN.colors.bgElevated,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm }}>
          <div style={{
            width: 28, height: 28, borderRadius: DESIGN.radius.md,
            background: `linear-gradient(135deg, ${DESIGN.colors.amber}, ${DESIGN.colors.amberDim})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: 14, fontWeight: 700, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.2 }}>
              Chat History
            </h1>
            <span style={{ fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
              {state.conversations.length} conversations
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleNewConversation} style={{ padding: '4px 8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </Button>
      </div>

      {/* Search */}
      <div style={{
            padding: `${DESIGN.spacing.md}px ${DESIGN.spacing.lg}px`,
            borderBottom: `1px solid ${DESIGN.colors.border}`,
            backgroundColor: DESIGN.colors.bgElevated,
        }}>
        <Input placeholder="Search conversations..." value={state.searchQuery} onChange={handleSearchChange} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} style={{ width: '100%' }}/>
      </div>

      {/* Phase Filter */}
      <div style={{
            padding: `${DESIGN.spacing.sm}px ${DESIGN.spacing.lg}px ${DESIGN.spacing.md}px`,
            borderBottom: `1px solid ${DESIGN.colors.border}`,
            backgroundColor: DESIGN.colors.bgElevated,
        }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: DESIGN.spacing.xs }}>
          <Button variant={state.phaseFilter === null ? 'primary' : 'ghost'} size="sm" onClick={() => handlePhaseFilterChange(null)} style={{ fontSize: 10, padding: '4px 8px' }}>
            All
          </Button>
          {PHASE_GROUPS.map(group => (<div key={group.groupId} style={{ display: 'flex', flexWrap: 'wrap', gap: DESIGN.spacing.xs }}>
              {group.phases.map(p => (<Button key={p.id} variant={state.phaseFilter === p.id ? 'primary' : 'ghost'} size="sm" onClick={() => handlePhaseFilterChange(state.phaseFilter === p.id ? null : p.id)} style={{
                    fontSize: 10,
                    padding: '4px 8px',
                    borderColor: getPhaseColor(p.id),
                    color: state.phaseFilter === p.id ? DESIGN.colors.bg : getPhaseColor(p.id),
                    backgroundColor: state.phaseFilter === p.id ? getPhaseColor(p.id) : 'transparent',
                }}>
                  P{p.id}
                </Button>))}
            </div>))}
        </div>
      </div>

      {/* Conversation List */}
      <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: DESIGN.spacing.md,
        }}>
        {state.isLoading ? (<div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 200, color: DESIGN.colors.fgDim, fontSize: 13,
            }}>
            Loading conversations...
          </div>) : filteredConversations.length === 0 ? (<div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: 200, color: DESIGN.colors.fgDim, fontSize: 13, textAlign: 'center', padding: DESIGN.spacing.lg,
            }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: DESIGN.spacing.md }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p style={{ margin: 0, fontWeight: 500 }}>No conversations found</p>
            <p style={{ margin: `${DESIGN.spacing.xs}px 0 0`, fontSize: 11, color: DESIGN.colors.fgDim }}>
              {state.searchQuery || state.phaseFilter !== null ? 'Try adjusting your filters' : 'Start a new research session'}
            </p>
          </div>) : (<div style={{ display: 'flex', flexDirection: 'column', gap: DESIGN.spacing.sm }}>
            {filteredConversations.map(conversation => (<ConversationCard key={conversation.id} conversation={conversation} isActive={state.activeConversation === conversation.id} onClick={() => handleConversationClick(conversation)}/>))}
          </div>)}
      </div>

      {/* Selected Conversation Preview */}
      {state.selectedConversation && (<div style={{
                borderTop: `1px solid ${DESIGN.colors.border}`,
                backgroundColor: DESIGN.colors.bgElevated,
                maxHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
          <div style={{
                padding: `${DESIGN.spacing.sm}px ${DESIGN.spacing.md}px`,
                borderBottom: `1px solid ${DESIGN.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: DESIGN.colors.fgMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: DESIGN.fonts.mono }}>
              Messages ({selectedMessages.length})
            </span>
            <Button variant="ghost" size="sm" onClick={() => setState(prev => ({ ...prev, selectedConversation: null, activeConversation: null }))}>
              Close
            </Button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: DESIGN.spacing.sm }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: DESIGN.spacing.sm }}>
              {selectedMessages.map(msg => (<MessagePreview key={msg.id} message={msg}/>))}
            </div>
          </div>
        </div>)}
    </div>);
}
function ConversationCard({ conversation, isActive, onClick }) {
    const phaseInfo = getPhaseInfo(conversation.phase);
    const phaseColor = getPhaseColor(conversation.phase);
    const statusColor = getStatusColor(conversation.status);
    return (<Card elevated={isActive} padding="sm" onClick={onClick} style={{
            borderColor: isActive ? phaseColor : DESIGN.colors.border,
            boxShadow: isActive ? `0 0 0 1px ${phaseColor}40, ${DESIGN.shadows.md}` : DESIGN.shadows.sm,
        }}>
      <div style={{ display: 'flex', gap: DESIGN.spacing.sm }}>
        <div style={{
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: statusColor,
            marginTop: 3,
            flexShrink: 0,
            boxShadow: `0 0 8px ${statusColor}`,
        }}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: DESIGN.spacing.sm, marginBottom: DESIGN.spacing.xs }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {conversation.title}
            </h4>
            <span style={{ fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono, flexShrink: 0 }}>
              {formatTime(conversation.updatedAt)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm, marginBottom: DESIGN.spacing.xs, flexWrap: 'wrap' }}>
            <PhaseBadge phase={conversation.phase} size="sm"/>
            <StatusDot status={conversation.status} size={6}/>
          </div>
          <p style={{ fontSize: 11, color: DESIGN.colors.fgMuted, margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {conversation.lastMessage}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.md, marginTop: DESIGN.spacing.xs, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              {conversation.papers}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {conversation.gapsFound} gap{conversation.gapsFound !== 1 ? 's' : ''}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              {conversation.messages} msg
            </span>
          </div>
        </div>
      </div>
    </Card>);
}
function MessagePreview({ message }) {
    const phaseInfo = getPhaseInfo(message.phase);
    const phaseColor = getPhaseColor(message.phase);
    return (<div style={{
            display: 'flex',
            gap: DESIGN.spacing.sm,
            padding: DESIGN.spacing.xs,
            backgroundColor: message.role === 'assistant' ? DESIGN.colors.bg : 'transparent',
            borderRadius: DESIGN.radius.sm,
            border: `1px solid ${message.role === 'assistant' ? DESIGN.colors.border : 'transparent'}`,
        }}>
      <div style={{
            width: 20, height: 20, borderRadius: '50%',
            backgroundColor: message.role === 'user' ? DESIGN.colors.amber : phaseColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 2,
        }}>
        {message.role === 'user' ? (<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>) : (<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.xs, marginBottom: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: DESIGN.colors.fgMuted, textTransform: 'uppercase', fontFamily: DESIGN.fonts.mono }}>
            {message.role === 'user' ? 'USER' : 'ASSISTANT'}
          </span>
          {message.tool && (<ToolChip name={message.tool} phase={message.phase} size="sm" showPhase={false}/>)}
          <span style={{ fontSize: 9, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono, marginLeft: 'auto' }}>
            P{message.phase} • {formatTime(message.timestamp)}
          </span>
        </div>
        <p style={{ fontSize: 11, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: DESIGN.fonts.mono }}>
          {message.content}
        </p>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map
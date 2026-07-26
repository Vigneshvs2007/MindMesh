'use client';
import { useState, useEffect } from 'react';
import ChatHistorySidebar from '../chat-history-sidebar/page';
import PhaseSearchBar from '../phase-search-bar/page';
import OverleafFlowButton from '../overleaf-flow-button/page';
import { DESIGN, PHASE_GROUPS, getPhaseColor, getPhaseInfo } from '../components/design-tokens';
import { PhaseBadge, ToolChip, StatusDot, Input, Button, Badge, Separator } from '../components/ui';
const MOCK_CONVERSATIONS = [
    {
        id: 'conv-001',
        title: 'Federated Learning Privacy Research',
        topic: 'federated learning privacy',
        phase: 6,
        status: 'completed',
        messages: [
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
        papers: 14,
        gapsFound: 5,
        currentGap: 'Adaptive differential privacy that allocates privacy budget dynamically per client per round based on data heterogeneity and contribution',
    },
    {
        id: 'conv-002',
        title: 'Efficient Attention for Long Sequences',
        topic: 'linear attention mechanisms',
        phase: 3,
        status: 'in-progress',
        messages: [
            { id: 'msg-1', role: 'user', content: 'Find papers on linear attention and efficient transformers', timestamp: '2026-07-25T18:00:00Z', phase: 1 },
            { id: 'msg-2', role: 'assistant', content: 'Found 18 papers covering FlashAttention, Linear Attention, Performer, Reformer, and more.', timestamp: '2026-07-25T18:00:30Z', phase: 1, tool: 'search_papers' },
        ],
        papers: 18,
        gapsFound: 3,
    },
];
const MESSAGES = MOCK_CONVERSATIONS[0].messages;
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
function formatFullTime(iso) {
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
export default function ResearchPilotShell() {
    const [state, setState] = useState({
        activeConversation: MOCK_CONVERSATIONS[0],
        sidebarCollapsed: false,
        searchQuery: '',
        phaseFilter: null,
        searchBarQuery: '',
        searchBarPhase: MOCK_CONVERSATIONS[0].phase,
        searchBarShowTools: false,
        overleafProjectId: 'fl_proj_1785024096407',
        overleafStatus: 'synced',
        layout: 'full',
    });
    // Initialize from widget data (in production, use useWidgetState)
    useEffect(() => {
        // const data = useWidgetState<WidgetData>();
        // setState(prev => ({ ...prev, ...data }));
    }, []);
    const conversation = state.activeConversation;
    const currentMessages = conversation?.messages || MESSAGES;
    const currentPhase = conversation?.phase || state.searchBarPhase;
    const phaseInfo = getPhaseInfo(currentPhase);
    const phaseColor = getPhaseColor(currentPhase);
    const handleConversationSelect = (conv) => {
        setState(prev => ({
            ...prev,
            activeConversation: conv,
            searchBarPhase: conv.phase,
            searchBarQuery: '',
        }));
    };
    const handleSidebarToggle = () => {
        setState(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
    };
    const handleSearchChange = (query) => {
        setState(prev => ({ ...prev, searchQuery: query }));
    };
    const handlePhaseFilterChange = (phase) => {
        setState(prev => ({ ...prev, phaseFilter: phase }));
    };
    const handleSearchBarQueryChange = (query) => {
        setState(prev => ({ ...prev, searchBarQuery: query }));
    };
    const handleSearchBarPhaseChange = (phase) => {
        setState(prev => ({ ...prev, searchBarPhase: phase }));
    };
    const handleSearchBarToolsToggle = () => {
        setState(prev => ({ ...prev, searchBarShowTools: !prev.searchBarShowTools }));
    };
    const handlePhaseToolClick = (toolName) => {
        console.log('Execute tool:', toolName, 'for phase', currentPhase);
    };
    const handleSendMessage = () => {
        if (!state.searchBarQuery.trim() || !conversation)
            return;
        console.log('Send message:', state.searchBarQuery);
        setState(prev => ({ ...prev, searchBarQuery: '' }));
    };
    const handleOverleafSync = () => {
        console.log('Trigger full Overleaf sync');
    };
    const handleNewConversation = () => {
        console.log('New conversation');
    };
    return (<div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            backgroundColor: DESIGN.colors.bg,
            fontFamily: DESIGN.fonts.sans,
            color: DESIGN.colors.fg,
            overflow: 'hidden',
        }}>
      {/* Global Header */}
      <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${DESIGN.spacing.sm}px ${DESIGN.spacing.lg}px`,
            backgroundColor: DESIGN.colors.bgElevated,
            borderBottom: `1px solid ${DESIGN.colors.border}`,
            height: 48,
            flexShrink: 0,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.md }}>
          <Button variant="ghost" size="sm" onClick={handleSidebarToggle} style={{ padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </Button>
          <div style={{
            width: 32, height: 32, borderRadius: DESIGN.radius.md,
            background: `linear-gradient(135deg, ${DESIGN.colors.amber}, ${DESIGN.colors.amberDim})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: 14, fontWeight: 700, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.2 }}>
              ScholarPilot
            </h1>
            <span style={{ fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
              Research Pilot Shell
            </span>
          </div>
          {conversation && (<>
              <Separator orientation="vertical" style={{ height: 24, margin: '0 8px' }}/>
              <PhaseBadge phase={conversation.phase} size="sm"/>
            </>)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm }}>
          {/* Phase Navigator */}
          <div style={{ display: 'flex', gap: DESIGN.spacing.xs }}>
            {PHASE_GROUPS.flatMap(g => g.phases).map(p => (<Button key={p.id} variant={currentPhase === p.id ? 'primary' : 'ghost'} size="sm" onClick={() => handleSearchBarPhaseChange(p.id)} style={{
                padding: '4px 8px', fontSize: 10,
                borderColor: getPhaseColor(p.id),
                color: currentPhase === p.id ? DESIGN.colors.bg : getPhaseColor(p.id),
                backgroundColor: currentPhase === p.id ? getPhaseColor(p.id) : 'transparent',
            }}>
                P{p.id}
              </Button>))}
          </div>

          <Button variant="ghost" size="sm" onClick={() => console.log('Settings')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        {!state.sidebarCollapsed && (<aside style={{
                width: 360,
                minWidth: 320,
                maxWidth: 420,
                backgroundColor: DESIGN.colors.bg,
                borderRight: `1px solid ${DESIGN.colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
            <ChatHistorySidebar conversations={MOCK_CONVERSATIONS} activeConversation={conversation?.id || null} onConversationSelect={handleConversationSelect} onNewConversation={handleNewConversation} searchQuery={state.searchQuery} onSearchChange={handleSearchChange} phaseFilter={state.phaseFilter} onPhaseFilterChange={handlePhaseFilterChange}/>
          </aside>)}

        {/* Main Content Area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Phase Search Bar */}
          <div style={{ borderBottom: `1px solid ${DESIGN.colors.border}`, flexShrink: 0 }}>
            <PhaseSearchBar currentPhase={state.searchBarPhase} phaseName={getPhaseInfo(state.searchBarPhase)?.name || 'Unknown'} query={state.searchBarQuery} onQueryChange={handleSearchBarQueryChange} onPhaseChange={handleSearchBarPhaseChange} onSearch={() => handleSendMessage()} onToolsToggle={handleSearchBarToolsToggle} showTools={state.searchBarShowTools} onToolClick={handlePhaseToolClick}/>
          </div>

          {/* Conversation View */}
          <div style={{ flex: 1, overflowY: 'auto', padding: DESIGN.spacing.lg, display: 'flex', flexDirection: 'column' }}>
            {conversation ? (<>
                {/* Conversation Header */}
                <div style={{ marginBottom: DESIGN.spacing.lg, paddingBottom: DESIGN.spacing.md, borderBottom: `1px solid ${DESIGN.colors.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: DESIGN.spacing.md, marginBottom: DESIGN.spacing.sm }}>
                    <div>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.3 }}>
                        {conversation.title}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm, marginTop: DESIGN.spacing.xs, flexWrap: 'wrap' }}>
                        <PhaseBadge phase={conversation.phase} size="md"/>
                        <StatusDot status={conversation.status} size={8}/>
                        <span style={{ fontSize: 11, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
                          {conversation.papers} papers • {conversation.gapsFound} gaps • {conversation.messages.length} messages
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: DESIGN.spacing.xs }}>
                      <Button variant="secondary" size="sm" onClick={handleOverleafSync}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                          <polyline points="23 4 23 10 17 10"/>
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                        </svg>
                        Sync to Overleaf
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => console.log('Draft paper')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        Draft Paper
                      </Button>
                    </div>
                  </div>

                  {conversation.currentGap && (<div style={{
                    padding: DESIGN.spacing.md,
                    backgroundColor: `${phaseColor}15`,
                    border: `1px solid ${phaseColor}40`,
                    borderRadius: DESIGN.radius.md,
                }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.xs, marginBottom: DESIGN.spacing.xs }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={phaseColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span style={{ fontSize: 11, fontWeight: 600, color: phaseColor, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: DESIGN.fonts.mono }}>
                          Current Research Gap
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.5 }}>
                        {conversation.currentGap}
                      </p>
                    </div>)}
                </div>

                {/* Messages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: DESIGN.spacing.md, flex: 1 }}>
                  {currentMessages.map(msg => (<MessageBubble key={msg.id} message={msg}/>))}
                </div>
              </>) : (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: DESIGN.spacing.xl }}>
                <div style={{
                width: 80, height: 80, borderRadius: '50%',
                backgroundColor: `${DESIGN.colors.amber}20`,
                border: `1px solid ${DESIGN.colors.amber}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: DESIGN.spacing.lg,
            }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={DESIGN.colors.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: DESIGN.colors.fg, margin: '0 0 8px' }}>
                  Welcome to ScholarPilot
                </h2>
                <p style={{ fontSize: 14, color: DESIGN.colors.fgMuted, margin: 0, maxWidth: 400, lineHeight: 1.6 }}>
                  Select a conversation from the sidebar or start a new research session to begin your literature review workflow.
                </p>
                <Button variant="primary" size="lg" onClick={handleNewConversation} style={{ marginTop: DESIGN.spacing.lg }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Start New Research Session
                </Button>
              </div>)}
          </div>

          {/* Composer */}
          {conversation && (<div style={{
                padding: DESIGN.spacing.lg,
                borderTop: `1px solid ${DESIGN.colors.border}`,
                backgroundColor: DESIGN.colors.bgElevated,
                flexShrink: 0,
            }}>
              <div style={{ display: 'flex', gap: DESIGN.spacing.sm, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <Input placeholder={`Ask about Phase ${currentPhase}: ${phaseInfo?.name}... (type tool name to run directly)`} value={state.searchBarQuery} onChange={(e) => handleSearchBarQueryChange(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        } }} style={{ fontSize: 13 }}/>
                  <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm, marginTop: DESIGN.spacing.xs }}>
                    <Badge variant="info" size="sm" style={{ fontSize: 9 }}>P{currentPhase} · {phaseInfo?.name}</Badge>
                    <Button variant="ghost" size="sm" onClick={handleSearchBarToolsToggle} style={{ padding: '4px 8px', fontSize: 10 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                      </svg>
                      Tools
                    </Button>
                    <span style={{ fontSize: 10, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono }}>
                      Enter to send · Shift+Enter for newline
                    </span>
                  </div>
                </div>
                <Button variant="primary" size="md" onClick={handleSendMessage} disabled={!state.searchBarQuery.trim()} style={{ padding: '10px 20px', fontSize: 13, height: 'fit-content' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </Button>
              </div>
            </div>)}

          {/* Overleaf Flow Button - Floating or Bottom Panel */}
          <OverleafFlowButton projectId={state.overleafProjectId} status={state.overleafStatus} onSync={handleOverleafSync}/>
        </main>
      </div>
    </div>);
}
function MessageBubble({ message }) {
    const phaseInfo = getPhaseInfo(message.phase);
    const phaseColor = getPhaseColor(message.phase);
    const isUser = message.role === 'user';
    return (<div style={{
            display: 'flex',
            gap: DESIGN.spacing.md,
            maxWidth: '85%',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            flexDirection: isUser ? 'row-reverse' : 'row',
        }}>
      <div style={{
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: isUser ? DESIGN.colors.amber : phaseColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 2,
        }}>
        {isUser ? (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>) : (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8"/>
            <path d="M12 17v4"/>
          </svg>)}
      </div>
      <div style={{
            flex: 1,
            backgroundColor: isUser ? `${DESIGN.colors.amber}15` : DESIGN.colors.bgElevated,
            border: `1px solid ${isUser ? `${DESIGN.colors.amber}40` : DESIGN.colors.border}`,
            borderRadius: DESIGN.radius.lg,
            padding: `${DESIGN.spacing.sm}px ${DESIGN.spacing.md}px`,
            minWidth: 200,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: DESIGN.spacing.sm, marginBottom: DESIGN.spacing.xs, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: DESIGN.colors.fgMuted,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontFamily: DESIGN.fonts.mono,
        }}>
            {isUser ? 'USER' : 'ASSISTANT'}
          </span>
          {message.tool && (<ToolChip name={message.tool} phase={message.phase} size="sm" showPhase={false}/>)}
          <span style={{ fontSize: 9, color: DESIGN.colors.fgDim, fontFamily: DESIGN.fonts.mono, marginLeft: 'auto' }}>
            P{message.phase} • {formatFullTime(message.timestamp)}
          </span>
        </div>
        <p style={{ fontSize: 13, color: DESIGN.colors.fg, margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: DESIGN.fonts.sans }}>
          {message.content}
        </p>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map
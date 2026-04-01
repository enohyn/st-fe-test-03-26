import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  resetKey: string;
  onRetry: () => void;
}

interface State {
  error: Error | null;
  retriesLeft: number;
  isRetrying: boolean;
}

const MAX_AUTO_RETRIES = 2;

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, retriesLeft: MAX_AUTO_RETRIES, isRetrying: false };
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch() {
    const { retriesLeft } = this.state;
    if (retriesLeft > 0) {
      this.setState({ isRetrying: true });
      const delay = 1500 * (MAX_AUTO_RETRIES - retriesLeft + 1);
      this.retryTimer = setTimeout(() => {
        this.setState(s => ({ error: null, retriesLeft: s.retriesLeft - 1, isRetrying: false }));
        this.props.onRetry();
      }, delay);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset when navigation params change so retries are fresh
    if (prevProps.resetKey !== this.props.resetKey) {
      if (this.retryTimer) clearTimeout(this.retryTimer);
      this.setState({ error: null, retriesLeft: MAX_AUTO_RETRIES, isRetrying: false });
    }
  }

  componentWillUnmount() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  handleManualRetry = () => {
    if (this.retryTimer) clearTimeout(this.retryTimer);
    this.setState({ error: null, retriesLeft: MAX_AUTO_RETRIES, isRetrying: false });
    this.props.onRetry();
  };

  render() {
    const { error, isRetrying, retriesLeft } = this.state;

    if (!error) return this.props.children;

    // Auto-retrying: show banner (also shown between getDerivedStateFromError and componentDidCatch)
    if (isRetrying || retriesLeft > 0) {
      return (
        <div className="flex items-center gap-2.5 px-4 py-[0.65rem] rounded-[10px] bg-amber-50 border border-amber-300 text-amber-800 text-sm font-medium">
          <Loader2 size={16} className="animate-spin shrink-0" />
          Connection issue — retrying automatically…
        </div>
      );
    }

    // All retries exhausted
    return (
      <div className="glass-panel flex flex-col items-center px-8 py-16 text-center gap-4">
        <AlertCircle size={44} color="var(--error)" />
        <div>
          <h2 className="text-[1.15rem] font-semibold mb-1.5">Failed to load products</h2>
          <p className="text-[var(--text-muted)] text-sm max-w-[420px]">{error.message}</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={this.handleManualRetry}>
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }
}

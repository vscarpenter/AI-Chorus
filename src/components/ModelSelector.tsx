import { LLM_PROVIDERS } from '@/lib/llm-providers';
import { Select } from './ui/Select';

interface ModelSelectorProps {
  selectedProvider: string;
  selectedModel: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

export function ModelSelector({
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange,
  disabled = false
}: ModelSelectorProps) {
  const currentProvider = LLM_PROVIDERS.find(p => p.id === selectedProvider);

  const handleProviderChange = (providerId: string) => {
    onProviderChange(providerId);
    const provider = LLM_PROVIDERS.find(p => p.id === providerId);
    if (provider && provider.models.length > 0) {
      onModelChange(provider.models[0].id);
    }
  };

  return (
    <div className="flex gap-[var(--space-sm)]">
      <div className="flex-1">
        <Select
          label="LLM Provider"
          value={selectedProvider}
          onChange={(e) => handleProviderChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select Provider</option>
          {LLM_PROVIDERS.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex-1">
        <Select
          label="Model"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={disabled || !currentProvider}
        >
          <option value="">Select Model</option>
          {currentProvider?.models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
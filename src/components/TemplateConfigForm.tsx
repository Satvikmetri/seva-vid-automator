import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Trash2 } from 'lucide-react';

interface TemplateConfig {
  templeId: string;
  header: string;
  description: string;
  templateName: string;
}

interface TemplateConfigFormProps {
  configs: TemplateConfig[];
  onConfigsChange: (configs: TemplateConfig[]) => void;
}

export function TemplateConfigForm({ configs, onConfigsChange }: TemplateConfigFormProps) {
  const [newConfig, setNewConfig] = useState<TemplateConfig>({
    templeId: '',
    header: '',
    description: '',
    templateName: ''
  });

  const addConfig = () => {
    if (newConfig.templeId && newConfig.header && newConfig.description) {
      onConfigsChange([...configs, { ...newConfig }]);
      setNewConfig({ templeId: '', header: '', description: '', templateName: '' });
    }
  };

  const removeConfig = (index: number) => {
    onConfigsChange(configs.filter((_, i) => i !== index));
  };

  const updateConfig = (index: number, field: keyof TemplateConfig, value: string) => {
    const updated = configs.map((config, i) => 
      i === index ? { ...config, [field]: value } : config
    );
    onConfigsChange(updated);
  };

  return (
    <Card className="w-full shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>Template Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Configs */}
        {configs.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground">Configured Templates</h4>
            {configs.map((config, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 bg-gradient-subtle">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Temple ID: {config.templeId}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeConfig(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Header</Label>
                    <Input
                      value={config.header}
                      onChange={(e) => updateConfig(index, 'header', e.target.value)}
                      placeholder="Message header"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Template Name</Label>
                    <Input
                      value={config.templateName}
                      onChange={(e) => updateConfig(index, 'templateName', e.target.value)}
                      placeholder="interakt_template_name"
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={config.description}
                    onChange={(e) => updateConfig(index, 'description', e.target.value)}
                    placeholder="Message description/body"
                    rows={3}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Config */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-4">Add New Template</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templeId">Temple ID</Label>
                <Input
                  id="templeId"
                  value={newConfig.templeId}
                  onChange={(e) => setNewConfig({ ...newConfig, templeId: e.target.value })}
                  placeholder="e.g., 46"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={newConfig.templateName}
                  onChange={(e) => setNewConfig({ ...newConfig, templateName: e.target.value })}
                  placeholder="seva_vid_update_nd"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="header">Header</Label>
              <Input
                id="header"
                value={newConfig.header}
                onChange={(e) => setNewConfig({ ...newConfig, header: e.target.value })}
                placeholder="Your seva video is ready!"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newConfig.description}
                onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })}
                placeholder="Dear {{name}}, your personalized seva video has been processed. Watch it here: {{video_link}}"
                rows={4}
              />
            </div>
            
            <Button 
              onClick={addConfig}
              variant="warm"
              className="w-full"
              disabled={!newConfig.templeId || !newConfig.header || !newConfig.description}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Template Configuration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

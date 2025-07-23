import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Upload, MessageCircle } from 'lucide-react';

interface ProcessingStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
  details?: string;
}

interface ProcessingDashboardProps {
  steps: ProcessingStep[];
  currentStep: string;
}

export function ProcessingDashboard({ steps, currentStep }: ProcessingDashboardProps) {
  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-primary animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-success">Completed</Badge>;
      case 'processing':
        return <Badge variant="default" className="bg-primary animate-pulse-glow">Processing</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card className="w-full shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-primary" />
          <span>Processing Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              {getStepIcon(step.status)}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{step.title}</h4>
                {getStatusBadge(step.status)}
              </div>
              
              {step.details && (
                <p className="text-sm text-muted-foreground">{step.details}</p>
              )}
              
              {step.status === 'processing' && step.progress !== undefined && (
                <div className="space-y-2">
                  <Progress value={step.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {step.progress}% complete
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
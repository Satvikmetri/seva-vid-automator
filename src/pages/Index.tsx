import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileUploadCard } from '@/components/FileUploadCard';
import { TemplateConfigForm } from '@/components/TemplateConfigForm';
import { ProcessingDashboard } from '@/components/ProcessingDashboard';
import { Play, Upload, Settings, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface TemplateConfig {
  templeId: string;
  header: string;
  description: string;
  templateName: string;
}

interface ProcessingStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
  details?: string;
}

const Index = () => {
  const [userDataFile, setUserDataFile] = useState<File | null>(null);
  const [batchLinksFile, setBatchLinksFile] = useState<File | null>(null);
  const [templateConfigs, setTemplateConfigs] = useState<TemplateConfig[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('');

  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: 'parse',
      title: 'Parse CSV Files',
      status: 'pending',
      details: 'Reading and validating uploaded CSV files'
    },
    {
      id: 'download',
      title: 'Download Canva Videos',
      status: 'pending',
      details: 'Downloading videos from Canva based on Batch IDs'
    },
    {
      id: 'upload',
      title: 'Upload to YouTube',
      status: 'pending',
      details: 'Uploading videos to YouTube as unlisted'
    },
    {
      id: 'map',
      title: 'Map YouTube Links',
      status: 'pending',
      details: 'Mapping YouTube links back to user data'
    },
    {
      id: 'whatsapp',
      title: 'Send WhatsApp Messages',
      status: 'pending',
      details: 'Sending personalized messages via Interakt'
    }
  ]);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setCurrentStep('parse');
    
    // Simulate processing steps (replace with actual API calls)
    setTimeout(() => {
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'parse' ? { ...step, status: 'processing', progress: 50 } : step
      ));
    }, 500);
  };

  const canStartProcessing = userDataFile && batchLinksFile && templateConfigs.length > 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-6">
              <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                Yajmaan.in Automation Tool
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold">
                Seva Video WhatsApp
                <span className="block text-primary-glow">Automation</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Streamline your devotional services with automated video processing, 
                YouTube uploads, and personalized WhatsApp messaging
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>CSV Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>YouTube Upload</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* File Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FileUploadCard
            title="User Data CSV"
            description="Upload CSV with Name, Country Code, Phone, Batch ID, Temple ID"
            onFileUpload={setUserDataFile}
            uploadedFile={userDataFile}
          />
          <FileUploadCard
            title="Batch Canva Links CSV"
            description="Upload CSV with Batch ID and corresponding Canva Links"
            onFileUpload={setBatchLinksFile}
            uploadedFile={batchLinksFile}
          />
        </div>

        {/* Template Configuration */}
        <TemplateConfigForm
          configs={templateConfigs}
          onConfigsChange={setTemplateConfigs}
        />

        {/* Control Panel */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <span>Automation Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-4">
                <Badge variant={userDataFile ? "default" : "outline"} className={userDataFile ? "bg-success" : ""}>
                  {userDataFile ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                  User Data {userDataFile ? "Ready" : "Pending"}
                </Badge>
                <Badge variant={batchLinksFile ? "default" : "outline"} className={batchLinksFile ? "bg-success" : ""}>
                  {batchLinksFile ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                  Batch Links {batchLinksFile ? "Ready" : "Pending"}
                </Badge>
                <Badge variant={templateConfigs.length > 0 ? "default" : "outline"} className={templateConfigs.length > 0 ? "bg-success" : ""}>
                  {templateConfigs.length > 0 ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                  Templates ({templateConfigs.length})
                </Badge>
              </div>

              <Button
                onClick={handleStartProcessing}
                disabled={!canStartProcessing || isProcessing}
                variant="gradient"
                size="lg"
                className="w-full md:w-auto text-lg font-semibold"
              >
                {isProcessing ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Automation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processing Dashboard */}
        {isProcessing && (
          <div className="animate-fade-in">
            <ProcessingDashboard
              steps={processingSteps}
              currentStep={currentStep}
            />
          </div>
        )}

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 shadow-soft hover:shadow-medium transition-smooth">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Smart CSV Processing</h3>
            <p className="text-sm text-muted-foreground">
              Automatically parses and validates your user data and video links
            </p>
          </Card>
          
          <Card className="text-center p-6 shadow-soft hover:shadow-medium transition-smooth">
            <Play className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">YouTube Integration</h3>
            <p className="text-sm text-muted-foreground">
              Seamlessly uploads videos as unlisted content with proper mapping
            </p>
          </Card>
          
          <Card className="text-center p-6 shadow-soft hover:shadow-medium transition-smooth">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">WhatsApp Automation</h3>
            <p className="text-sm text-muted-foreground">
              Sends personalized messages using Interakt's dynamic templates
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
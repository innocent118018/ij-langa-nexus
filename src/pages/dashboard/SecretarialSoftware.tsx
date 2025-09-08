import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Calendar, 
  FileText, 
  Users, 
  Shield, 
  Archive,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SecretarialSoftware = () => {
  const modules = [
    {
      icon: Building2,
      title: "Entity Management",
      description: "Create and manage company profiles, directors, shareholders",
      features: ["Company Registration", "Director Management", "Shareholder Records", "Corporate Structure"],
      status: "active"
    },
    {
      icon: Calendar,
      title: "Compliance Calendar",
      description: "Automated alerts for CIPC filings, annual returns, resolutions",
      features: ["Filing Deadlines", "Automated Reminders", "Compliance Tracking", "Annual Returns"],
      status: "active"
    },
    {
      icon: FileText,
      title: "Document Automation",
      description: "Generate MOIs, resolutions, share certificates",
      features: ["MOI Generation", "Board Resolutions", "Share Certificates", "Legal Templates"],
      status: "active"
    },
    {
      icon: Users,
      title: "Meeting Management",
      description: "Schedule board meetings, upload minutes, assign actions",
      features: ["Meeting Scheduler", "Minutes Management", "Action Items", "Attendee Tracking"],
      status: "coming-soon"
    },
    {
      icon: Shield,
      title: "Audit Trail",
      description: "Track every change with timestamped logs",
      features: ["Change Tracking", "User Activity", "Document History", "Compliance Reports"],
      status: "active"
    },
    {
      icon: Archive,
      title: "Secure Storage",
      description: "POPIA-compliant document vault with access controls",
      features: ["Document Vault", "Access Controls", "POPIA Compliance", "Backup & Recovery"],
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'coming-soon':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'coming-soon':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Secretarial Software</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive company secretarial management platform
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Premium Feature
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center gap-1 ${getStatusColor(module.status)}`}
                  >
                    {getStatusIcon(module.status)}
                    {module.status === 'active' ? 'Active' : 'Coming Soon'}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant={module.status === 'active' ? 'default' : 'outline'} 
                    className="w-full"
                    disabled={module.status !== 'active'}
                  >
                    {module.status === 'active' ? 'Access Module' : 'Coming Soon'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Protection</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• POPIA-compliant data handling</li>
                <li>• End-to-end encryption</li>
                <li>• Regular security audits</li>
                <li>• Secure backup systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Access Control</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Role-based permissions</li>
                <li>• Multi-factor authentication</li>
                <li>• Audit trail logging</li>
                <li>• Session management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to begin using the secretarial software
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium">Set up your company profile</p>
                <p className="text-sm text-muted-foreground">Add your company details and registration information</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium">Configure compliance calendar</p>
                <p className="text-sm text-muted-foreground">Set up important dates and automated reminders</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium">Import existing documents</p>
                <p className="text-sm text-muted-foreground">Upload current corporate documents to the secure vault</p>
              </div>
            </div>
            <Button className="w-full">
              Start Setup Process
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretarialSoftware;
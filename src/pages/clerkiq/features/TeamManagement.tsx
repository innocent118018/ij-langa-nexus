import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Shield, Settings, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TeamManagement = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Team Management</h1>
          <p className="text-muted-foreground">
            Learn how to manage your ClerkiQ team, invite members, and set roles and permissions.
          </p>
        </div>

        {/* Team Account Basics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Account Basics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">ClerkiQ uses a team-based account model, which means:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your firm has a single team account</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You can add multiple team members to your account</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Each member is assigned a specific role with different permissions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>All members share access to the same data and documents within your account</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Team Members */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Managing Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Inviting New Members</h3>
              <p className="text-muted-foreground mb-4">To invite new team members to your ClerkiQ account:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Navigate to the Members section in your dashboard</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Click the Invite Members button in the top right corner</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Enter the email address of each person you want to invite</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Select the appropriate role for each member</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</span>
                  <span>Click Send Invites to send email invitations</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> You can invite up to 5 members at once. Each invited member will receive an email with a link to join your team.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Accepting Invitations</h3>
              <p className="text-muted-foreground mb-4">When a team member receives an invitation:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>They should click the link in the invitation email</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>If they don't have a ClerkiQ account yet, they'll be prompted to create one</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>After signing in, they can click Join Team to accept the invitation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>They'll now have access to your team account with the assigned role</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Roles */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Team Roles and Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">ClerkiQ offers different roles to help you control what each team member can do:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge className="bg-gold text-gold-foreground">Owner</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">The Owner has full access to all features and settings:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Manage team members (invite, remove, change roles)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Manage billing and purchase page credits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Access and process all financial documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Configure account settings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Transfer ownership to another team member</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="secondary">Member</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Members have standard access for day-to-day work:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Access and process financial documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Invite new members to the team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">View but not change billing information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Cannot remove other team members or change roles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Managing Pending Invitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">For invitations that haven't been accepted yet, you can:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Resend Invitation</h4>
                  <p className="text-sm text-muted-foreground">Click the menu icon and select "Resend Invitation" to send the email again.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Renew Expired Invitation</h4>
                  <p className="text-sm text-muted-foreground">For expired invitations, select "Renew Invitation" to generate a new link.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Delete Invitation</h4>
                  <p className="text-sm text-muted-foreground">Remove unwanted invitations by selecting "Remove Invitation".</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tips for Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Plan your team structure</p>
                    <p className="text-sm text-muted-foreground">Decide who needs Owner privileges and who should be a Member</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Use clear team names</p>
                    <p className="text-sm text-muted-foreground">Choose a descriptive name for your team account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Add a team logo</p>
                    <p className="text-sm text-muted-foreground">Upload your firm's logo to make your team account recognizable</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Regularly review members</p>
                    <p className="text-sm text-muted-foreground">Periodically check your team and remove access for those who no longer need it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Be selective with Owner role</p>
                    <p className="text-sm text-muted-foreground">Limit the number of Owners to maintain better control</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Monitor team activity</p>
                    <p className="text-sm text-muted-foreground">Use activity logs to track team member actions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to build your team?</h3>
            <p className="text-muted-foreground mb-4">
              Start collaborating with your accounting team on ClerkiQ today.
            </p>
            <Button size="lg" asChild>
              <a href="/auth">Get Started</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamManagement;
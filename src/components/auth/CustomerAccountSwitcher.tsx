import React, { useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Building2, 
  ChevronDown, 
  LogOut, 
  User, 
  Check
} from 'lucide-react';

export const CustomerAccountSwitcher = () => {
  const { 
    currentAccount, 
    availableAccounts, 
    switchAccount, 
    signOut, 
    isLoading 
  } = useCustomerAuth();
  
  const [isSwitching, setIsSwitching] = useState(false);

  if (!currentAccount) return null;

  const handleSwitchAccount = async (accountId: string) => {
    if (accountId === currentAccount.id) return;
    
    setIsSwitching(true);
    try {
      await switchAccount(accountId);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Group accounts by primary/sub
  const primaryAccounts = availableAccounts.filter(acc => acc.is_primary_account);
  const subAccounts = availableAccounts.filter(acc => !acc.is_primary_account);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          disabled={isLoading || isSwitching}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="truncate max-w-[200px] text-sm font-medium">
                {currentAccount.customer_name}
              </span>
              {!currentAccount.is_primary_account && (
                <Badge variant="secondary" className="text-xs">
                  Sub Account
                </Badge>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Account Selection
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {primaryAccounts.length > 0 && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Primary Accounts
            </DropdownMenuLabel>
            {primaryAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => handleSwitchAccount(account.id)}
                disabled={isSwitching}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {account.customer_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Primary Account
                    </p>
                  </div>
                </div>
                {account.id === currentAccount.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
        
        {subAccounts.length > 0 && (
          <>
            {primaryAccounts.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Sub Accounts
            </DropdownMenuLabel>
            {subAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => handleSwitchAccount(account.id)}
                disabled={isSwitching}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {account.customer_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sub Account
                    </p>
                  </div>
                </div>
                {account.id === currentAccount.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-destructive cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
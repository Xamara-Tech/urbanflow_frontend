import Link from 'next/link';
import { Building, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="md:flex md:items-center md:space-x-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">UrbanFlow</span>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            <p>&copy; 2025 Kilimani Urban Intelligence Platform. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0">
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client"

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Star, 
  Volume2, 
  Upload,
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const buildingId = params.buildingId as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
    walkability_rating: [3],
    noise_level_rating: [3],
    is_sensitive: false,
    evidence_files: [] as File[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.submitFeedback({
        building_id: buildingId,
        comment: formData.comment,
        walkability_rating: formData.walkability_rating[0],
        noise_level_rating: formData.noise_level_rating[0],
        evidence_files: formData.evidence_files,
        is_sensitive: formData.is_sensitive
      });

      toast.success('Feedback submitted successfully!');
      router.push('/residents');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Buildings
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Submit Feedback</h1>
          <p className="mt-2 text-muted-foreground">
            Share your experience and help improve our community development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Building Feedback Form</CardTitle>
                <CardDescription>
                  Your feedback helps urban planners and architects make better decisions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="comment">Your Feedback</Label>
                    <Textarea
                      id="comment"
                      placeholder="Share your thoughts about this building, area, or any issues you've experienced..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Walkability Rating</Label>
                      <div className="px-3">
                        <Slider
                          value={formData.walkability_rating}
                          onValueChange={(value) => setFormData({ ...formData, walkability_rating: value })}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>Poor</span>
                          <span className="font-medium">{formData.walkability_rating[0]}/5</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>How easy is it to walk around this area?</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Noise Level Rating</Label>
                      <div className="px-3">
                        <Slider
                          value={formData.noise_level_rating}
                          onValueChange={(value) => setFormData({ ...formData, noise_level_rating: value })}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>Quiet</span>
                          <span className="font-medium">{formData.noise_level_rating[0]}/5</span>
                          <span>Very Noisy</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Volume2 className="h-4 w-4" />
                        <span>How would you rate the noise levels?</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Evidence Files (Optional)</Label>
                    <FileUpload
                      onFilesChange={(files) => setFormData({ ...formData, evidence_files: files })}
                      acceptedTypes={['image/*', 'video/*', 'audio/*']}
                      maxFiles={5}
                      maxSize={10}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload photos, videos, or audio recordings to support your feedback.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sensitive"
                      checked={formData.is_sensitive}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, is_sensitive: checked as boolean })
                      }
                    />
                    <Label htmlFor="sensitive" className="text-sm">
                      This feedback contains sensitive information that requires special attention
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" disabled={isLoading} className="gradient-primary text-white">
                      {isLoading ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feedback Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10 mt-0.5">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Be Specific</p>
                    <p className="text-sm text-muted-foreground">
                      Include details about location, time, and specific issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-secondary/10 mt-0.5">
                    <Upload className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Provide Evidence</p>
                    <p className="text-sm text-muted-foreground">
                      Photos, videos, or audio can help validate your concerns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-accent/10 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Stay Constructive</p>
                    <p className="text-sm text-muted-foreground">
                      Focus on solutions and improvements rather than just complaints.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Privacy Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your feedback will be shared with urban planners and architects to improve community development. 
                  Personal information is kept confidential, and you can choose to submit feedback anonymously.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
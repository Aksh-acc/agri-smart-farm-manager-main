
import React, { useState } from 'react';
import { Calendar, Clock, Headphones, MessageSquare, Video, X, Youtube } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ExpertConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  queryDescription?: string;
}

interface ExpertProps {
  id: string;
  name: string;
  specialty: string;
  availability: string;
  rating: number;
  imageUrl?: string;
}

interface VideoResourceProps {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
  url: string;
}

const ExpertConsultation = ({ isOpen, onClose, queryDescription = '' }: ExpertConsultationProps) => {
  const [selectedTab, setSelectedTab] = useState("live-experts");
  
  // Mock data for experts
  const experts: ExpertProps[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "Crop Disease Specialist",
      availability: "Available Now",
      rating: 4.8,
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      specialty: "Soil Health Expert",
      availability: "Available in 30 min",
      rating: 4.9,
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: "3",
      name: "Mohan Singh",
      specialty: "Organic Farming Consultant",
      availability: "Available Now",
      rating: 4.7,
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];
  
  // Mock data for video resources
  const videoResources: VideoResourceProps[] = [
    {
      id: "1",
      title: "Understanding Plant Diseases: Prevention & Treatment",
      channel: "AgriTech Insights",
      duration: "12:45",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "2",
      title: "Soil Health Management for Better Crop Yield",
      channel: "FarmKnowledge",
      duration: "18:32",
      thumbnailUrl: "https://img.youtube.com/vi/XbGJzQgsNhU/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=XbGJzQgsNhU"
    },
    {
      id: "3",
      title: "Best Practices for Seasonal Crops in India",
      channel: "AgriWise Official",
      duration: "22:15",
      thumbnailUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    }
  ];

  const handleExpertConnect = (expertId: string) => {
    console.log(`Connecting to expert with ID: ${expertId}`);
    // In a real implementation, this would initiate a call or chat with the expert
    alert(`Connecting to expert. You will receive a notification when they're ready.`);
  };

  const handleWatchVideo = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Expert Consultation</DialogTitle>
          <DialogDescription>
            Get help from agricultural experts or watch relevant video resources
          </DialogDescription>
        </DialogHeader>
        
        {queryDescription && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium">Your Query:</p>
            <p className="text-sm">{queryDescription}</p>
          </div>
        )}
        
        <Tabs defaultValue="live-experts" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="live-experts" className="flex items-center gap-1.5">
              <Headphones className="h-4 w-4" />
              <span>Live Experts</span>
            </TabsTrigger>
            <TabsTrigger value="video-resources" className="flex items-center gap-1.5">
              <Youtube className="h-4 w-4" />
              <span>Video Resources</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live-experts" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Connect with agricultural experts for personalized advice:</p>
            {experts.map(expert => (
              <Card key={expert.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <Avatar className="h-10 w-10">
                        {expert.imageUrl ? (
                          <img src={expert.imageUrl} alt={expert.name} />
                        ) : (
                          <span>{expert.name[0]}</span>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{expert.name}</CardTitle>
                        <CardDescription>{expert.specialty}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{expert.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 pt-0">
                  <div className="flex items-center gap-1 text-sm text-emerald-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{expert.availability}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleExpertConnect(expert.id)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleExpertConnect(expert.id)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <Video className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="video-resources" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Watch instructional videos related to your query:</p>
            {videoResources.map(video => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-[160px] object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 text-xs rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2">{video.title}</CardTitle>
                  <CardDescription>{video.channel}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full flex items-center gap-1.5"
                    onClick={() => handleWatchVideo(video.url)}
                  >
                    <Youtube className="h-4 w-4" />
                    <span>Watch Video</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertConsultation;

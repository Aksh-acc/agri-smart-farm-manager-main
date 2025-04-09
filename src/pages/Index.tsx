
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import FeatureCard from '@/components/ui/feature-card';
import SectionHeader from '@/components/ui/section-header';
import { Seedling } from '@/components/utils/icons';
import { Sprout, Leaf, FlaskConical, Shield, BarChart3, Cloud, Sun, Droplet, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedIllustration from '@/components/ui/animated-illustration';

const Index = () => {
  const features = [
    {
      title: 'Crop Recommendation',
      description: 'Get AI-powered crop recommendations based on your soil conditions, location, and climate data.',
      icon: Seedling,
      to: '/crop-recommendation',
      iconColor: 'text-primary-600'
    },
    {
      title: 'Fertilizer Recommendation',
      description: 'Optimize your fertilizer usage with personalized recommendations for your soil and crop type.',
      icon: FlaskConical,
      to: '/fertilizer-recommendation',
      iconColor: 'text-accent-gold'
    },
    {
      title: 'Disease Detection',
      description: 'Quickly identify plant diseases by uploading images and get treatment recommendations.',
      icon: Shield,
      to: '/disease-detection',
      iconColor: 'text-accent-blue'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small-scale Farmer',
      content: 'AgriWise has revolutionized how I manage my farm. The crop recommendations have increased my yield by 30% this season!',
      avatar: 'https://source.unsplash.com/random/100x100/?person=1'
    },
    {
      name: 'Michael Chen',
      role: 'Agricultural Consultant',
      content: 'I recommend AgriWise to all my clients. The disease detection feature has saved countless crops from devastating losses.',
      avatar: 'https://source.unsplash.com/random/100x100/?person=2'
    },
    {
      name: 'Elena Martinez',
      role: 'Organic Farm Owner',
      content: 'The fertilizer recommendations are incredibly precise and have helped me maintain organic certification while maximizing productivity.',
      avatar: 'https://source.unsplash.com/random/100x100/?person=3'
    }
  ];

  const stats = [
    { value: '85%', label: 'Accuracy in crop predictions' },
    { value: '40%', label: 'Average yield increase' },
    { value: '90+', label: 'Plant diseases detected' },
    { value: '10k+', label: 'Farmers using AgriWise' }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <HeroSection
        title="Smart Farming Solutions with Web3 Technology"
        subtitle="AI-powered recommendations for crops, fertilizers, and plant disease detection to maximize your farm's productivity."
        imageSrc="https://source.unsplash.com/photo-1517022812141-23620dba5c23"
        imageAlt="Aerial view of a green farm field"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
          <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
            <Link to="/crop-recommendation">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Added animated illustrations */}
        <div className="absolute top-10 right-10 opacity-75 hidden xl:block">
          <AnimatedIllustration 
            icon={Cloud} 
            size={60} 
            color="#9b87f5" 
            animation="float"
            className="cloud-float"
          />
        </div>
        <div className="absolute bottom-5 left-5 opacity-75 hidden xl:block">
          <AnimatedIllustration 
            icon={Leaf} 
            size={40} 
            color="#4caf50" 
            animation="float"
          />
        </div>
      </HeroSection>

      {/* Features Section */}
      <section className="py-16 bg-muted/50 relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute top-10 left-10 opacity-30">
          <AnimatedIllustration 
            icon={Sprout} 
            size={100} 
            color="#4caf50" 
            animation="pulse"
          />
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <AnimatedIllustration 
            icon={Leaf} 
            size={80} 
            color="#7E69AB" 
            animation="float"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Empower Your Farming Decisions"
            subtitle="Our intelligent tools use advanced machine learning to provide personalized recommendations."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Animated elements */}
            <div className="absolute top-5 right-5 opacity-25">
              <AnimatedIllustration 
                icon={BarChart3} 
                size={100} 
                color="white" 
                animation="pulse"
              />
            </div>
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AgriWise Impact</h2>
              <p className="text-primary-50 max-w-2xl mx-auto">Our AI-powered platform is transforming agriculture around the world with accurate predictions and recommendations.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute left-0 top-20 opacity-20">
          <AnimatedIllustration 
            icon={Sun} 
            size={120} 
            color="#F97316" 
            animation="spin"
          />
        </div>
        <div className="absolute right-0 bottom-20 opacity-20">
          <AnimatedIllustration 
            icon={Droplet} 
            size={80} 
            color="#0EA5E9" 
            animation="pulse"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="How AgriWise Works"
            subtitle="Follow these simple steps to get started with our smart farming solutions"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="glass-card p-6 text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <AnimatedIllustration 
                  icon={Droplet} 
                  size={40} 
                  color="#0EA5E9" 
                  animation="pulse"
                  className="opacity-70"
                />
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Your Data</h3>
              <p className="text-muted-foreground">Provide details about your farm location, soil conditions, or upload plant images.</p>
            </div>

            <div className="glass-card p-6 text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <AnimatedIllustration 
                  icon={ThermometerSun} 
                  size={40} 
                  color="#F97316" 
                  animation="float"
                  className="opacity-70"
                />
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our advanced machine learning models analyze your data to generate insights.</p>
            </div>

            <div className="glass-card p-6 text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <AnimatedIllustration 
                  icon={Sprout} 
                  size={40} 
                  color="#4caf50" 
                  animation="bounce"
                  className="opacity-70"
                />
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">Receive personalized recommendations and actionable insights for your farm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/50 relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute -left-10 top-40 opacity-30">
          <AnimatedIllustration 
            icon={Leaf} 
            size={120} 
            color="#9b87f5" 
            animation="float"
          />
        </div>
        <div className="absolute -right-10 bottom-20 opacity-30">
          <AnimatedIllustration 
            icon={Sprout} 
            size={100} 
            color="#0EA5E9" 
            animation="pulse"
          />
        </div>
      
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="What Farmers Say"
            subtitle="Hear from farmers who have transformed their practices using AgriWise"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Animated elements */}
            <div className="absolute left-10 top-10 opacity-20">
              <AnimatedIllustration 
                icon={Sun} 
                size={80} 
                color="white" 
                animation="spin"
              />
            </div>
            <div className="absolute right-10 bottom-10 opacity-20">
              <AnimatedIllustration 
                icon={Sprout} 
                size={60} 
                color="white" 
                animation="float"
              />
            </div>
          
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative z-10">Ready to Transform Your Farming?</h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8 relative z-10">Join thousands of farmers who are maximizing yields and reducing costs with AgriWise.</p>
            <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50 relative z-10">
              <Link to="/crop-recommendation">Start Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;

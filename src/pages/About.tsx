
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import SectionHeader from '@/components/ui/section-header';
import { Users, Mail, Phone, MapPin, Leaf, Shield, FlaskConical } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Emily Chen',
      role: 'Agricultural Data Scientist',
      bio: 'Ph.D. in Agricultural Science with 10+ years of experience in crop modeling and machine learning applications in agriculture.',
      avatar: 'https://source.unsplash.com/random/200x200/?woman=1'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in building AI-powered agricultural applications and web3 technologies.',
      avatar: 'https://source.unsplash.com/random/200x200/?man=1'
    },
    {
      name: 'Sarah Johnson',
      role: 'Plant Pathologist',
      bio: 'Expert in plant diseases with extensive field experience helping farmers identify and treat crop health issues.',
      avatar: 'https://source.unsplash.com/random/200x200/?woman=2'
    },
    {
      name: 'David Nguyen',
      role: 'Soil Scientist',
      bio: 'Specializes in soil fertility management and developing sustainable fertilizer recommendations for various soil types.',
      avatar: 'https://source.unsplash.com/random/200x200/?man=2'
    }
  ];

  return (
    <PageLayout>
      <HeroSection
        title="About AgriWise"
        subtitle="Empowering farmers with AI-driven insights for smart agricultural decisions"
        imageSrc="https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
        imageAlt="Field of crops at sunset"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At AgriWise, we're committed to revolutionizing agriculture through technology. Our mission is to provide farmers with accessible, accurate, and actionable insights that improve crop yields, reduce resource waste, and promote sustainable farming practices.
              </p>
              <p className="text-muted-foreground">
                By combining cutting-edge machine learning with agricultural science, we empower farmers of all scales to make data-driven decisions for their specific conditions and needs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Smart Crop Selection</h3>
                <p className="text-muted-foreground text-sm">AI-driven recommendations for optimal crop selection based on local conditions.</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FlaskConical className="h-8 w-8 text-accent-gold" />
                </div>
                <h3 className="font-semibold mb-2">Precise Fertilization</h3>
                <p className="text-muted-foreground text-sm">Tailored fertilizer recommendations to maximize yield while minimizing waste.</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent-blue" />
                </div>
                <h3 className="font-semibold mb-2">Disease Detection</h3>
                <p className="text-muted-foreground text-sm">Early identification of plant diseases to prevent crop loss.</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground text-sm">Connecting farmers with experts and resources for ongoing assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Technology"
            subtitle="How we combine agricultural science with cutting-edge AI"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Crop Recommendation Model</h3>
              <p className="text-muted-foreground">
                Our crop recommendation system analyzes over 20 variables including soil composition, climate data, and historical yield information to suggest the most suitable crops for your specific conditions. The model is continuously updated with new data to improve its accuracy.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Fertilizer Optimization</h3>
              <p className="text-muted-foreground">
                Using regression analysis and decision tree algorithms, our fertilizer recommendation engine provides precise nutrient recommendations based on soil tests and crop needs, helping you optimize inputs and reduce environmental impact.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Computer Vision for Disease Detection</h3>
              <p className="text-muted-foreground">
                Our disease detection system employs convolutional neural networks trained on thousands of plant images to identify over 90 different crop diseases with high accuracy, giving you early warnings and treatment recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Team"
            subtitle="Meet the experts behind AgriWise"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary-50 dark:border-primary-900/50"
                />
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">123 Farming Avenue, Agriville, AG 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">info@agriwise.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="input-field w-full"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="input-field w-full"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="input-field w-full"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;

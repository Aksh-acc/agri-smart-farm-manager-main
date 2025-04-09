
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/ui/hero-section';
import SectionHeader from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ShoppingBag, Sparkles, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import TokenDisplay from '@/components/ui/token-display';
import { useRewards } from '@/contexts/RewardsContext';
import AnimatedIllustration from '@/components/ui/animated-illustration';

// Define product types
interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Token price
  image: string;
  category: 'fertilizer' | 'seed' | 'tool';
  stock: number;
}

const TokenStore = () => {
  const { tokens, useTokens } = useRewards();
  const [cartItems, setCartItems] = useState<StoreProduct[]>([]);
  
  // Sample products
  const products: StoreProduct[] = [
    {
      id: 'fert-1',
      name: 'Organic Nitrogen Fertilizer',
      description: 'Perfect for leafy vegetables, contains high nitrogen content.',
      price: 15,
      image: 'https://source.unsplash.com/random/300x300/?fertilizer',
      category: 'fertilizer',
      stock: 12
    },
    {
      id: 'fert-2',
      name: 'Phosphorus Rich Fertilizer',
      description: 'Best for flowering and fruiting plants.',
      price: 20,
      image: 'https://source.unsplash.com/random/300x300/?plant-food',
      category: 'fertilizer',
      stock: 8
    },
    {
      id: 'fert-3',
      name: 'All-Purpose Organic Fertilizer',
      description: 'Balanced nutrients for all types of plants and crops.',
      price: 25,
      image: 'https://source.unsplash.com/random/300x300/?organic-fertilizer',
      category: 'fertilizer',
      stock: 5
    },
    {
      id: 'seed-1',
      name: 'Premium Tomato Seeds',
      description: 'Disease-resistant tomato variety for high yields.',
      price: 10,
      image: 'https://source.unsplash.com/random/300x300/?seeds',
      category: 'seed',
      stock: 20
    }
  ];

  const handlePurchase = (product: StoreProduct) => {
    // Check if user has enough tokens
    if (tokens < product.price) {
      toast.error("Not enough tokens to purchase this item");
      return;
    }

    // Try to use tokens
    const success = useTokens(product.price);
    if (success) {
      toast.success(`Successfully purchased ${product.name}`);
      setCartItems([...cartItems, product]);
    } else {
      toast.error("Failed to process purchase");
    }
  };

  return (
    <PageLayout>
      <HeroSection
        title="AgriToken Store"
        subtitle="Redeem your earned tokens for fertilizers, seeds and other farming essentials"
        imageSrc="https://source.unsplash.com/photo-1589923188651-268a089dca1d"
        imageAlt="Agriculture store with fertilizers and seeds"
      />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <SectionHeader 
              title="Available Products"
              subtitle="Use your AgriTokens to purchase premium products"
              className="mb-0"
            />
            
            <div className="flex items-center gap-4">
              <TokenDisplay showLabel={true} />
              {cartItems.length > 0 && (
                <Button variant="outline" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{cartItems.length}</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="glass-card overflow-hidden">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                      <Sparkles className="h-3 w-3 text-amber-500 mr-1" />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">{product.price}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handlePurchase(product)}
                      disabled={product.stock === 0 || tokens < product.price}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {tokens === 0 && (
            <div className="mt-12 glass-card p-4 md:p-6">
              <div className="flex items-center gap-4">
                <AnimatedIllustration 
                  icon={AlertTriangle} 
                  size={40} 
                  animation="pulse" 
                  className="text-amber-500" 
                />
                <div>
                  <h3 className="text-lg font-medium mb-1">No tokens available</h3>
                  <p className="text-muted-foreground">
                    Contribute disease images in the Disease Detection section to earn AgriTokens.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default TokenStore;

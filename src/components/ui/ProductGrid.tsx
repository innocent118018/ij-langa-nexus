import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingCart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';


interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  subcategory?: string;
  processing_time?: string;
}

interface ProductGridProps {
  products: Product[];
  category: string;
  itemsPerPage?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  category, 
  itemsPerPage = 30 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const createSlug = (name: string, code: string) => {
    return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${code.toLowerCase()}`.replace(/^-|-$/g, '');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <Card key={product.id || index} className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs font-mono">
                    {product.code}
                  </Badge>
                  {product.subcategory && (
                    <Badge variant="outline" className="text-xs">
                      {product.subcategory}
                    </Badge>
                  )}
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-sm font-semibold line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </CardTitle>
              {product.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between pt-0">
              <div className="space-y-2">
                {product.processing_time && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Processing:</span> {product.processing_time}
                  </div>
                )}
                
                <div className="text-lg font-bold text-primary">
                  {product.price ? formatCurrency(product.price) : (
                    <span className="text-sm text-muted-foreground">Price on request</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                {product.price ? (
                  <Link to="/contact" className="w-full">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Order {formatCurrency(product.price)}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                  </Link>
                )}
                
                <Link 
                  to={`/services/${category}/${createSlug(product.name, product.code)}`}
                  className="w-full"
                >
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="min-w-[2.5rem]"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Page Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
      </div>
    </div>
  );
};
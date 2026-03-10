import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Heart,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Scissors,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  qty: number;
}

interface CustomOrderForm {
  name: string;
  email: string;
  phone: string;
  description: string;
  budget: string;
  deadline: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Data
const products: Product[] = [
  {
    id: 1,
    name: "Sozni Embroidered Shawl",
    price: 4500,
    image: "/assets/generated/gallery-shawl.dim_600x600.jpg",
  },
  {
    id: 2,
    name: "Hand Embroidered Suit",
    price: 6200,
    image: "/assets/generated/gallery-suit.dim_600x600.jpg",
  },
  {
    id: 3,
    name: "Embroidery Hoop (Custom)",
    price: 1800,
    image: "/assets/generated/gallery-hoop.dim_600x600.jpg",
  },
  {
    id: 4,
    name: "Logo Embroidery Service",
    price: 2500,
    image: "/assets/generated/gallery-logo.dim_600x600.jpg",
  },
];

const galleryItems = [
  {
    label: "Sozni Shawl",
    image: "/assets/generated/gallery-shawl.dim_600x600.jpg",
  },
  {
    label: "Hand Embroidered Suit",
    image: "/assets/generated/gallery-suit.dim_600x600.jpg",
  },
  {
    label: "Embroidery Hoop Art",
    image: "/assets/generated/gallery-hoop.dim_600x600.jpg",
  },
  {
    label: "Custom Logo Embroidery",
    image: "/assets/generated/gallery-logo.dim_600x600.jpg",
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [orderForm, setOrderForm] = useState<CustomOrderForm>({
    name: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    deadline: "",
  });
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      description: "",
      budget: "",
      deadline: "",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    window.open(`https://wa.me/918082521289?text=${text}`, "_blank");
    setContactSubmitted(true);
    toast.success("Opening WhatsApp — we'll reply within 24 hours!");
    setContactForm({ name: "", email: "", message: "" });
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home.link" },
    { label: "About", id: "about", ocid: "nav.about.link" },
    { label: "Gallery", id: "gallery", ocid: "nav.gallery.link" },
    { label: "Custom Orders", id: "custom-orders", ocid: "nav.shop.link" },
    { label: "Shop", id: "shop", ocid: "nav.shop.link" },
    { label: "Contact", id: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <div className="min-h-screen bg-brand-ivory font-body">
      <Toaster position="top-right" richColors />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-ivory/95 backdrop-blur-sm shadow-card"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-brand-burgundy tracking-wide">
                Royal Sozni Studio
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-brand-charcoal hover:text-brand-gold transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Cart + Mobile */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="shop.cart_button"
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-brand-beige transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-brand-charcoal" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-brand-burgundy text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </button>
              <button
                type="button"
                className="md:hidden p-2 rounded-full hover:bg-brand-beige transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-brand-ivory border-t border-border pb-4"
              >
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={link.ocid}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-gold hover:bg-brand-beige transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-embroidery.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/70 via-brand-charcoal/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-brand-gold font-body text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              ✦ Handmade from Kashmir ✦
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Traditional Kashmiri Sozni Hand Embroidery
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 font-body leading-relaxed">
              Handmade with Passion – Each Stitch Tells a Story
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-ocid="hero.gallery_button"
                onClick={() => scrollTo("gallery")}
                size="lg"
                className="bg-brand-gold hover:bg-brand-gold/90 text-white px-8 py-6 text-base font-semibold rounded-none tracking-wide"
              >
                Explore Gallery <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                data-ocid="hero.shop_button"
                onClick={() => scrollTo("shop")}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-charcoal px-8 py-6 text-base font-semibold rounded-none tracking-wide bg-transparent"
              >
                Shop Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-gold/20">
              {[
                {
                  icon: <Heart className="w-5 h-5" />,
                  title: "Handcrafted",
                  desc: "Every piece lovingly stitched by hand",
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: "Heritage Designs",
                  desc: "Centuries-old Kashmiri Sozni tradition",
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Custom Orders",
                  desc: "Personalized embroidery just for you",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-brand-charcoal/80 backdrop-blur-sm p-6 text-center"
                >
                  <div className="text-brand-gold mb-2 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-white font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-8 leading-tight">
                A Passion Born in the Valley of Uri
              </h2>
              <p className="text-brand-charcoal/80 leading-8 text-lg mb-6">
                My name is Insha, and I grew up in the beautiful valley of Uri,
                Kashmir, where the art of Sozni embroidery has been passed down
                through generations. From a young age, I watched the women of my
                family create intricate patterns with just a needle and thread —
                each stitch a labor of love.
              </p>
              <p className="text-brand-charcoal/80 leading-8 text-lg mb-8">
                Today, through Royal Sozni Studio, I bring these timeless
                traditions to you. Every piece I create is handmade with care,
                patience, and a deep respect for our Kashmiri heritage.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-brand-gold" />
                <span className="font-heading text-brand-gold italic text-lg">
                  — Insha, Founder
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-gold/30 rounded-sm" />
              <img
                src="/assets/generated/gallery-shawl.dim_600x600.jpg"
                alt="Kashmiri Sozni Shawl - Royal Sozni Studio"
                className="relative w-full aspect-square object-cover rounded-sm shadow-golden"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-sm">
                <p className="font-heading text-brand-burgundy font-bold">
                  Royal Sozni Studio
                </p>
                <p className="text-sm text-brand-charcoal/70">
                  Uri, Kashmir — Est. with Love
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Our Work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Embroidery Gallery
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              Each piece is a testament to generations of Kashmiri artistry
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="gallery-item relative overflow-hidden rounded-sm shadow-card cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="gallery-overlay absolute inset-0 bg-brand-burgundy/70 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="font-heading text-lg font-semibold">
                      {item.label}
                    </p>
                    <div className="w-10 h-px bg-brand-gold mx-auto mt-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDERS */}
      <section id="custom-orders" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
                Bespoke Work
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-6 leading-tight">
                Custom Embroidery Orders
              </h2>
              <p className="text-brand-charcoal/80 text-lg leading-8 mb-8">
                Request personalized Sozni embroidery — wedding gifts, name
                embroidery, custom logos, decorative hoops. Every order is
                crafted with the same dedication as our finest pieces.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Custom Wedding Gifts",
                  "Name & Monogram Embroidery",
                  "Logo Embroidery for Brands",
                  "Decorative Hoop Art",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-brand-charcoal/80">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/918082521289"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold text-sm tracking-wide transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Quick WhatsApp Inquiry
              </a>
            </div>

            <div className="bg-white rounded-sm shadow-card p-8">
              {orderSubmitted ? (
                <motion.div
                  data-ocid="custom_order.success_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-2">
                    Thank you!
                  </h3>
                  <p className="text-brand-charcoal/70">
                    We'll contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="mt-6 text-brand-gold underline text-sm"
                  >
                    Submit another order
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-5">
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-6">
                    Place Your Order
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="order-name"
                        className="text-brand-charcoal/80 text-sm font-medium"
                      >
                        Name *
                      </Label>
                      <Input
                        id="order-name"
                        required
                        value={orderForm.name}
                        onChange={(e) =>
                          setOrderForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="mt-1 rounded-none border-brand-gold/30 focus:border-brand-gold"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="order-email"
                        className="text-brand-charcoal/80 text-sm font-medium"
                      >
                        Email *
                      </Label>
                      <Input
                        id="order-email"
                        type="email"
                        required
                        value={orderForm.email}
                        onChange={(e) =>
                          setOrderForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className="mt-1 rounded-none border-brand-gold/30 focus:border-brand-gold"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="order-phone"
                      className="text-brand-charcoal/80 text-sm font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="order-phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="mt-1 rounded-none border-brand-gold/30 focus:border-brand-gold"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="order-desc"
                      className="text-brand-charcoal/80 text-sm font-medium"
                    >
                      What would you like embroidered? *
                    </Label>
                    <Textarea
                      id="order-desc"
                      required
                      value={orderForm.description}
                      onChange={(e) =>
                        setOrderForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      className="mt-1 rounded-none border-brand-gold/30 focus:border-brand-gold min-h-24"
                      placeholder="Describe your vision — design, colors, fabric..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-brand-charcoal/80 text-sm font-medium">
                        Budget
                      </Label>
                      <Select
                        onValueChange={(v) =>
                          setOrderForm((p) => ({ ...p, budget: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 rounded-none border-brand-gold/30"
                          data-ocid="custom_order.select"
                        >
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under1000">
                            Under ₹1,000
                          </SelectItem>
                          <SelectItem value="1000-3000">
                            ₹1,000 – ₹3,000
                          </SelectItem>
                          <SelectItem value="3000-5000">
                            ₹3,000 – ₹5,000
                          </SelectItem>
                          <SelectItem value="5000+">₹5,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="order-deadline"
                        className="text-brand-charcoal/80 text-sm font-medium"
                      >
                        Deadline
                      </Label>
                      <Input
                        id="order-deadline"
                        type="date"
                        value={orderForm.deadline}
                        onChange={(e) =>
                          setOrderForm((p) => ({
                            ...p,
                            deadline: e.target.value,
                          }))
                        }
                        className="mt-1 rounded-none border-brand-gold/30 focus:border-brand-gold"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    data-ocid="custom_order.submit_button"
                    className="w-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white rounded-none py-6 font-semibold tracking-wide"
                  >
                    Submit Custom Order
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Shop
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Kashmiri Embroidery
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              Handcrafted pieces, lovingly made
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                data-ocid={`shop.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-sm shadow-card overflow-hidden group"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-brand-gold text-white text-xs font-medium px-2 py-1 rounded-none">
                      Handmade
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-brand-burgundy mb-1">
                    {product.name}
                  </h3>
                  <p className="text-brand-gold font-bold text-xl mb-4">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-brand-burgundy hover:bg-brand-gold text-white rounded-none font-medium tracking-wide transition-colors"
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Get in Touch
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Contact Us
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="font-heading text-2xl font-bold text-brand-burgundy">
                Reach Out Directly
              </h3>
              {[
                {
                  icon: <Instagram className="w-5 h-5" />,
                  label: "Instagram",
                  value: "@insha_manzoor165",
                  href: "https://instagram.com/insha_manzoor165",
                  color: "bg-pink-100 text-pink-600",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "sameernaik5910@gmail.com",
                  href: "mailto:sameernaik5910@gmail.com",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: <MessageCircle className="w-5 h-5" />,
                  label: "WhatsApp",
                  value: "Chat with us",
                  href: "https://wa.me/918082521289",
                  color: "bg-green-100 text-green-600",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-sm shadow-card hover:shadow-golden transition-shadow group"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-brand-charcoal/50 font-medium">
                      {item.label}
                    </p>
                    <p className="font-semibold text-brand-burgundy group-hover:text-brand-gold transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto w-4 h-4 text-brand-charcoal/30 group-hover:text-brand-gold transition-colors" />
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-sm shadow-card p-8">
              {contactSubmitted ? (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-brand-charcoal/70">
                    WhatsApp opened — we'll reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="mt-6 text-brand-gold underline text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-6">
                    Send a Message
                  </h3>
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="text-brand-charcoal/80 text-sm font-medium"
                    >
                      Name *
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.input"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="mt-1 rounded-none border-brand-gold/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="text-brand-charcoal/80 text-sm font-medium"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="mt-1 rounded-none border-brand-gold/30"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="text-brand-charcoal/80 text-sm font-medium"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      className="mt-1 rounded-none border-brand-gold/30 min-h-32"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white rounded-none py-6 font-semibold tracking-wide"
                  >
                    Send via WhatsApp
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading text-xl font-bold text-white">
                  Royal Sozni Studio
                </span>
              </div>
              <p className="text-white/60 text-sm leading-6">
                Handcrafted with Love from Kashmir
              </p>
            </div>
            <div>
              <h4 className="font-heading text-white font-semibold mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {["Home", "About", "Gallery", "Shop", "Contact"].map((link) => (
                  <button
                    type="button"
                    key={link}
                    onClick={() => scrollTo(link.toLowerCase())}
                    className="block text-white/60 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-heading text-white font-semibold mb-4">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/insha_manzoor165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://wa.me/918082521289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
                <a
                  href="mailto:sameernaik5910@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Royal Sozni Studio. Built with{" "}
              <Heart className="w-3 h-3 inline text-red-400" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* CART MODAL */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent data-ocid="cart.modal" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-brand-burgundy flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Your Cart
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={() => setCartOpen(false)}
                className="ml-auto p-1 rounded-full hover:bg-brand-beige"
              >
                <X className="w-4 h-4" />
              </button>
            </DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="text-center py-12 text-brand-charcoal/50">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-heading text-lg">Your cart is empty</p>
              <p className="text-sm mt-1">
                Add some beautiful embroidery pieces!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-brand-burgundy truncate">
                      {item.name}
                    </p>
                    <p className="text-brand-gold font-bold">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-brand-beige"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-brand-beige"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-brand-charcoal">
                    Total
                  </span>
                  <span className="font-heading text-xl font-bold text-brand-gold">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <a
                  href={`https://wa.me/918082521289?text=${encodeURIComponent(`Hi! I'd like to order: ${cart.map((i) => `${i.name} (x${i.qty})`).join(", ")}. Total: ₹${cartTotal.toLocaleString("en-IN")}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 font-semibold text-sm tracking-wide transition-colors"
                >
                  <MessageCircle className="inline w-4 h-4 mr-2" />
                  Contact to Order via WhatsApp
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

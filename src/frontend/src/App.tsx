import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  ArrowRight,
  ChevronRight,
  Facebook,
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
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
    image: "/assets/uploads/IMG_3291-10.jpeg",
  },
  {
    id: 2,
    name: "Hand Embroidered Suit",
    price: 6200,
    image: "/assets/uploads/IMG_3293-2-17.jpeg",
  },
  {
    id: 3,
    name: "Embroidery Hoop Art",
    price: 1800,
    image: "/assets/uploads/IMG_3322-9.png",
  },
  {
    id: 4,
    name: "Logo Embroidery Service",
    price: 2500,
    image: "/assets/uploads/IMG_3385-1.jpeg",
  },
];

const galleryItems = [
  {
    label: "Sozni Embroidered Kurti",
    image: "/assets/uploads/IMG_3288-13.jpeg",
  },
  {
    label: "Hand Embroidery Detail",
    image: "/assets/uploads/IMG_3293-1-16.jpeg",
  },
  {
    label: "Red Kashmiri Shawl",
    image: "/assets/uploads/IMG_3291-10.jpeg",
  },
  {
    label: "Paisley Sozni Shawl",
    image: "/assets/uploads/e68a3000-6237-4b6a-b602-b747160824af-6.jpeg",
  },
  {
    label: "Pink Floral Shawl",
    image: "/assets/uploads/IMG_3300-14.jpeg",
  },
  {
    label: "Teddy Bear Hoop Art",
    image: "/assets/uploads/IMG_3322-9.png",
  },
  {
    label: "Custom Logo Embroidery",
    image: "/assets/uploads/IMG_3385-1.jpeg",
  },
  {
    label: "Kurti Flat Lay",
    image: "/assets/uploads/IMG_3293-2-17.jpeg",
  },
  {
    label: "REACHA Custom Work",
    image: "/assets/uploads/IMG_3323-4.jpeg",
  },
];

const testimonials = [
  {
    text: "Insha's work is absolutely breathtaking. My custom shawl arrived perfectly stitched and the detail is unreal.",
    name: "Fatima A.",
    location: "Dubai",
  },
  {
    text: "Ordered a custom hoop for my mother's birthday. She was in tears — it's that beautiful.",
    name: "Priya S.",
    location: "Mumbai",
  },
  {
    text: "The quality of Sozni embroidery is unlike anything I've seen. Will order again and again.",
    name: "Sarah M.",
    location: "London",
  },
];

const blogPosts = [
  {
    image: "/assets/uploads/IMG_3300-14.jpeg",
    date: "March 2026",
    title: "New Spring Collection in Progress",
    desc: "Currently working on a fresh set of floral Sozni shawls inspired by spring blooms in the Uri valley.",
  },
  {
    image: "/assets/uploads/IMG_3285-12.jpeg",
    date: "February 2026",
    title: "Custom Wedding Order Complete",
    desc: "Just finished a beautiful custom bridal set for a client in Dubai — 6 weeks of careful stitching.",
  },
  {
    image: "/assets/uploads/IMG_3323-4.jpeg",
    date: "January 2026",
    title: "New Logo Embroidery Service Launched",
    desc: "We now offer custom logo embroidery for brands and boutiques. Get in touch for bulk orders.",
  },
];

const faqItems = [
  {
    q: "How long does a custom order take?",
    a: "Depending on complexity, custom Sozni embroidery takes 2–8 weeks. Wedding pieces and large shawls may take up to 3 months. We will give you an exact timeline when you place your order.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship worldwide. Standard delivery within India takes 5–7 days. International shipping takes 10–20 business days depending on destination.",
  },
  {
    q: "How do I care for my Sozni embroidery?",
    a: "Dry clean only for embroidered shawls and suits. For hoop art, keep away from direct sunlight and humidity. Store flat or loosely rolled, never folded tightly.",
  },
  {
    q: "Can you frame my embroidery piece?",
    a: "Yes, we offer framing options for hoop art and select pieces. Just mention it when placing your order and we will discuss the best framing style.",
  },
  {
    q: "What is your refund policy?",
    a: "All custom orders are made to order and are non-refundable. Ready-made pieces can be returned within 7 days if unused and in original condition.",
  },
];

// Gallery item with zoom
function GalleryItem({
  item,
  index,
}: { item: { label: string; image: string }; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="break-inside-avoid mb-4 relative overflow-hidden rounded-sm shadow-card cursor-zoom-in group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      data-ocid={`gallery.item.${index + 1}`}
    >
      <img
        src={item.image}
        alt={item.label}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Zoom overlay */}
      {hovered && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ cursor: "zoom-in" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "250%",
              backgroundPosition: `${mousePos.x * 100}% ${mousePos.y * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5">
            <ZoomIn className="w-4 h-4 text-brand-burgundy" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-heading text-sm font-semibold">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}

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
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

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
    setCartOpen(true);
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
    const { name, phone, description, budget, deadline } = orderForm;
    let text = `Custom Order Request%0AName: ${name}%0APhone: ${phone}%0ADescription: ${description}`;
    if (budget) text += `%0ABudget: ${budget}`;
    if (deadline) text += `%0ADeadline: ${deadline}`;
    window.open(`https://wa.me/918082521289?text=${text}`, "_blank");
    toast.success("Opening WhatsApp — we'll get back to you soon!");
    setOrderSubmitted(true);
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      description: "",
      budget: "",
      deadline: "",
    });
    setReferenceImage(null);
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setNewsletterEmail("");
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
    {
      label: "Custom Orders",
      id: "custom-orders",
      ocid: "nav.custom_orders.link",
    },
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
            ? "bg-brand-ivory/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span
                className={`font-heading text-lg font-bold transition-colors ${
                  scrolled ? "text-brand-charcoal" : "text-white"
                }`}
              >
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
                  className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                    scrolled ? "text-brand-charcoal" : "text-white/90"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Cart & Mobile */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="cart.open_modal_button"
                onClick={() => setCartOpen(true)}
                className={`relative p-2 transition-colors hover:text-brand-gold ${
                  scrolled ? "text-brand-charcoal" : "text-white"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                data-ocid="nav.mobile_menu.toggle"
                onClick={() => setMobileMenuOpen((p) => !p)}
                className={`md:hidden p-2 transition-colors ${
                  scrolled ? "text-brand-charcoal" : "text-white"
                }`}
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
            backgroundImage: "url('/assets/uploads/IMG_3293-1-16.jpeg')",
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

      {/* HOW IT'S MADE */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              The Craft
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              How It's Made
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              Every piece begins as a vision and ends as a masterpiece
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "Design & Naqash",
                desc: "Every piece begins with the Naqash, a master craftsman who draws the intricate pattern directly onto the fabric using traditional tools.",
              },
              {
                num: "02",
                title: "Thread Selection",
                desc: "We select only the finest hand-spun silk threads, each color chosen to complement the fabric and bring the design to life.",
              },
              {
                num: "03",
                title: "The Fine Stitching",
                desc: "Using a single needle, our artisans stitch thousands of tiny loops by hand — a single shawl can take up to 3 months to complete.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center mb-6 shadow-golden">
                    <span className="font-heading text-white font-bold text-xl">
                      {step.num}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-10 -translate-x-5 h-px bg-brand-gold/40" />
                  )}
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-charcoal/70 leading-7">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISAN SPOTLIGHT */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/assets/uploads/IMG_3291-10.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              ✦ Heritage & Legacy ✦
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              The Soul of Sozni —<br />A Living Heritage
            </h2>
            <div className="w-16 h-px bg-brand-gold mx-auto mb-8" />
            <p className="text-white/75 text-lg leading-8 mb-6">
              Sozni embroidery originated in the Kashmir Valley over 500 years
              ago, brought to the region along the ancient Silk Route. The word
              'Sozni' comes from the Persian for 'needle' — and every piece is a
              testament to this centuries-old tradition. Recognized by the
              Government of India with a Geographical Indication (GI) tag,
              authentic Kashmiri Sozni embroidery is one of the world's most
              intricate textile arts.
            </p>
            <p className="text-white/75 text-lg leading-8">
              At Royal Sozni Studio, we are committed to preserving this legacy.
              Every artisan in our studio has trained for years under master
              craftspeople, learning the same techniques passed down through
              generations in the valley of Uri, Kashmir. When you purchase from
              us, you are not just buying embroidery — you are supporting a
              living art form.
            </p>
            <div className="mt-10">
              <Button
                data-ocid="artisan.custom_orders.button"
                onClick={() => scrollTo("custom-orders")}
                className="bg-brand-gold hover:bg-brand-gold/90 text-white rounded-none px-8 py-6 font-semibold tracking-wide"
              >
                Commission a Piece <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
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
                src="/assets/uploads/IMG_3285-12.jpeg"
                alt="Kashmiri Embroidered Kurti - Royal Sozni Studio"
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Happy Customers
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-sm shadow-card p-8 relative"
              >
                <div className="text-4xl text-brand-gold/20 font-heading font-bold leading-none mb-4">
                  ""
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
                <p className="text-brand-charcoal/80 leading-7 mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="font-heading font-bold text-brand-gold text-sm">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-brand-burgundy text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-charcoal/50">
                      {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Our Work
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Embroidery Gallery
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              Each piece is a testament to generations of Kashmiri artistry.
              Hover to zoom in.
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {galleryItems.map((item, i) => (
              <GalleryItem key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              The Transformation
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              From Vision to Stitch
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              See how a simple reference becomes a timeless piece of embroidery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden shadow-card max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/assets/uploads/IMG_3323-4.jpeg"
                alt="The inspiration reference"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-brand-charcoal/80 py-4 px-6">
                <p className="font-heading text-white font-semibold text-lg">
                  The Inspiration
                </p>
                <p className="text-white/60 text-sm">Reference design</p>
              </div>
            </motion.div>
            {/* Divider Arrow */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-brand-gold shadow-golden flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <img
                src="/assets/uploads/IMG_3293-1-16.jpeg"
                alt="The finished embroidery piece"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-brand-gold/90 py-4 px-6">
                <p className="font-heading text-white font-semibold text-lg">
                  The Finished Piece
                </p>
                <p className="text-white/80 text-sm">Hand-embroidered Sozni</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CUSTOM ORDERS */}
      <section id="custom-orders" className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
                Custom Work
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-8 leading-tight">
                Commission Your Dream Piece
              </h2>
              <p className="text-brand-charcoal/80 leading-8 text-lg mb-8">
                From portrait embroidery to custom wedding ensembles, we bring
                your vision to life stitch by stitch. Share your idea, and we'll
                create something uniquely yours.
              </p>
              <div className="space-y-4">
                {[
                  "Personal portrait embroidery",
                  "Wedding & bridal pieces",
                  "Custom logo & brand embroidery",
                  "Hoop art gifts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
                    <span className="text-brand-charcoal/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-sm shadow-card p-8"
            >
              {orderSubmitted ? (
                <motion.div
                  data-ocid="custom_order.success_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-brand-burgundy mb-2">
                    Order Received!
                  </h3>
                  <p className="text-brand-charcoal/70">
                    We'll reach out within 24 hours to discuss your custom
                    piece.
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
                    Tell Us Your Vision
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
                        data-ocid="custom_order.input"
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
                  {/* Reference Image Upload */}
                  <div>
                    <Label className="text-brand-charcoal/80 text-sm font-medium">
                      Upload Reference Image (optional)
                    </Label>
                    <label
                      htmlFor="order-image-upload"
                      data-ocid="custom_order.upload_button"
                      className="mt-1 flex items-center gap-3 border border-dashed border-brand-gold/40 rounded-none p-4 cursor-pointer hover:border-brand-gold hover:bg-brand-gold/5 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-brand-gold flex-shrink-0" />
                      <span className="text-sm text-brand-charcoal/60">
                        {referenceImage
                          ? referenceImage.name
                          : "Click to upload a reference photo"}
                      </span>
                    </label>
                    <input
                      id="order-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setReferenceImage(e.target.files?.[0] ?? null)
                      }
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
            </motion.div>
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
                    data-ocid={`shop.item.${i + 1}.button`}
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

      {/* STUDIO UPDATES BLOG */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              From The Studio
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Studio Updates
            </h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto text-lg">
              Behind-the-scenes glimpses of current projects and studio life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                data-ocid={`blog.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-sm shadow-card overflow-hidden group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-brand-charcoal/80 text-white text-xs font-medium px-3 py-1 rounded-none backdrop-blur-sm">
                      {post.date}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-burgundy mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-brand-charcoal/70 text-sm leading-6 mb-5">
                    {post.desc}
                  </p>
                  <a
                    href="https://wa.me/918082521289"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`blog.item.${i + 1}.button`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-brand-burgundy transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat to Order
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-brand-ivory">
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

      {/* FAQ */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Help
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-burgundy mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i + 1}`}
                data-ocid={`faq.item.${i + 1}`}
                className="bg-white rounded-sm shadow-card border-none px-6"
              >
                <AccordionTrigger className="font-heading text-brand-burgundy font-semibold text-left hover:no-underline hover:text-brand-gold py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-charcoal/75 leading-7 pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading text-xl font-bold text-white">
                  Royal Sozni Studio
                </span>
              </div>
              <p className="text-white/60 text-sm leading-6 mb-3">
                Handcrafted with Love from Kashmir
              </p>
              <p className="text-white/50 text-sm">
                📍 Uri, Baramulla, Kashmir — 193201
              </p>
            </div>
            {/* Quick Links */}
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
            {/* Connect */}
            <div>
              <h4 className="font-heading text-white font-semibold mb-4">
                Connect
              </h4>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://instagram.com/insha_manzoor165"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.instagram.link"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.facebook.link"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://wa.me/918082521289"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp.link"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
                <a
                  href="mailto:sameernaik5910@gmail.com"
                  data-ocid="footer.email.link"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <h4 className="font-heading text-white font-semibold mb-4">
                Stay Updated
              </h4>
              <p className="text-white/50 text-sm mb-3">
                Get updates on new pieces and studio news.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  required
                  data-ocid="footer.input"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-brand-gold flex-1 text-sm"
                />
                <Button
                  type="submit"
                  data-ocid="footer.submit_button"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-white rounded-none px-4 text-sm font-semibold flex-shrink-0"
                >
                  Subscribe
                </Button>
              </form>
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

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/918082521289"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.floating_button"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">
          Chat with the Artist
        </span>
      </motion.a>

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
            <div
              data-ocid="cart.empty_state"
              className="text-center py-12 text-brand-charcoal/50"
            >
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
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-heading font-bold text-brand-charcoal">
                    Total
                  </span>
                  <span className="font-heading font-bold text-xl text-brand-gold">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <Button
                  data-ocid="cart.checkout.button"
                  onClick={() => {
                    const items = cart
                      .map((i) => `${i.name} x${i.qty}`)
                      .join(", ");
                    window.open(
                      `https://wa.me/918082521289?text=I'd like to order: ${encodeURIComponent(items)}`,
                      "_blank",
                    );
                  }}
                  className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white rounded-none py-5 font-semibold tracking-wide"
                >
                  Checkout via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

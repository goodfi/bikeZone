import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto  grid gap-8 py-10 justify-center max-md:text-center md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">O nas</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/o-nas" className="hover:underline">
                O firmie
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:underline">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/kariera" className="hover:underline">
                Kariera
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pomoc</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/pomoc/dostawa" className="hover:underline">
                Dostawa
              </Link>
            </li>
            <li>
              <Link href="/pomoc/zwroty" className="hover:underline">
                Zwroty i reklamacje
              </Link>
            </li>
            <li>
              <Link href="/pomoc/platnosci" className="hover:underline">
                Płatności
              </Link>
            </li>
            <li>
              <Link href="/pomoc/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informacje</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/regulamin" className="hover:underline">
                Regulamin
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:underline">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/raty" className="hover:underline">
                Raty
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="hover:underline">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Kontakt</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <a href="tel:+48123456789" className="hover:underline">
                +48 123 456 789
              </a>
            </li>
            <li>
              <a href="mailto:kontakt@bikezone.pl" className="hover:underline">
                kontakt@bikezone.pl
              </a>
            </li>
            <li>
              <p>ul. Rowerowa 10</p>
              <p>00-000 Warszawa</p>
            </li>
          </ul>
          <div className="flex gap-4">
            <Link href="https://facebook.com" className="hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://instagram.com" className="hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" className="hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://youtube.com" className="hover:text-primary">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-6 ">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BikeZone. Wszystkie prawa
            zastrzeżone.
          </p>
          <div className="flex gap-4">
            <img
              src="/placeholder.svg?height=30&width=50"
              alt="Visa"
              className="h-6"
            />
            <img
              src="/placeholder.svg?height=30&width=50"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="/placeholder.svg?height=30&width=50"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="/placeholder.svg?height=30&width=50"
              alt="BLIK"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

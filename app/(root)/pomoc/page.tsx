import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Centrum pomocy</h1>
          <p className="mt-2 text-muted-foreground">
            Znajdź odpowiedzi na najczęściej zadawane pytania lub skontaktuj się
            z nami
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Kontakt</TabsTrigger>
            <TabsTrigger value="support">Wsparcie techniczne</TabsTrigger>
          </TabsList>

          {/* FAQ Section */}
          <TabsContent value="faq" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Jak mogę złożyć zamówienie?
                    </AccordionTrigger>
                    <AccordionContent>
                      Aby złożyć zamówienie, wybierz interesujący Cię produkt,
                      dodaj go do koszyka, a następnie przejdź do procesu
                      finalizacji zamówienia. Możesz płacić kartą, przelewem lub
                      za pobraniem.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Jakie są koszty dostawy?
                    </AccordionTrigger>
                    <AccordionContent>
                      Koszty dostawy zależą od wybranej metody. Standardowa
                      dostawa kurierem kosztuje 19,99 zł. Przy zamówieniach
                      powyżej 299 zł dostawa jest darmowa.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Jak długo trwa dostawa?</AccordionTrigger>
                    <AccordionContent>
                      Standardowy czas dostawy to 1-2 dni robocze od momentu
                      nadania przesyłki. Zamówienia złożone do godziny 14:00 w
                      dni robocze są zazwyczaj wysyłane tego samego dnia.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Czy mogę zwrócić zakupiony towar?
                    </AccordionTrigger>
                    <AccordionContent>
                      Tak, masz prawo odstąpić od umowy w ciągu 14 dni od
                      otrzymania towaru bez podania przyczyny. Wystarczy
                      wypełnić formularz zwrotu dostępny na naszej stronie i
                      odesłać produkt.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Jak mogę złożyć reklamację?
                    </AccordionTrigger>
                    <AccordionContent>
                      Aby złożyć reklamację, skontaktuj się z naszym działem
                      obsługi klienta poprzez formularz kontaktowy, e-mail lub
                      telefonicznie. Opisz problem i dołącz zdjęcia, jeśli to
                      możliwe.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Czy oferujecie raty?</AccordionTrigger>
                    <AccordionContent>
                      Tak, oferujemy możliwość zakupu na raty. Współpracujemy z
                      kilkoma bankami, dzięki czemu możesz wybrać
                      najkorzystniejszą dla siebie ofertę. Szczegóły dostępne są
                      podczas procesu zakupowego.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      Jak mogę sprawdzić status zamówienia?
                    </AccordionTrigger>
                    <AccordionContent>
                      Status zamówienia możesz sprawdzić logując się na swoje
                      konto w sekcji "Moje zamówienia". Informacje o statusie
                      wysyłamy również na adres e-mail podany podczas składania
                      zamówienia.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>
                      Czy mogę zmienić adres dostawy po złożeniu zamówienia?
                    </AccordionTrigger>
                    <AccordionContent>
                      Tak, możesz zmienić adres dostawy kontaktując się z naszym
                      działem obsługi klienta, ale tylko jeśli zamówienie nie
                      zostało jeszcze przekazane do realizacji.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dane kontaktowe</CardTitle>
                    <CardDescription>
                      Skontaktuj się z nami w dogodny dla Ciebie sposób
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Telefon</p>
                        <a
                          href="tel:+48123456789"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          +48 123 456 789
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:kontakt@bikezone.pl"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          kontakt@bikezone.pl
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Adres</p>
                        <p className="text-sm text-muted-foreground">
                          ul. Rowerowa 10
                          <br />
                          00-000 Warszawa
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Godziny pracy</p>
                        <p className="text-sm text-muted-foreground">
                          Poniedziałek - Piątek: 9:00 - 17:00
                          <br />
                          Sobota: 10:00 - 14:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Odwiedź nasz salon</CardTitle>
                    <CardDescription>
                      Zapraszamy do naszego salonu stacjonarnego
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="Mapa lokalizacji sklepu"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Formularz kontaktowy</CardTitle>
                  <CardDescription>
                    Wyślij nam wiadomość, a odpowiemy najszybciej jak to możliwe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Imię i nazwisko
                        </label>
                        <Input id="name" placeholder="Jan Kowalski" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jan.kowalski@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Temat
                      </label>
                      <Input id="subject" placeholder="W czym możemy pomóc?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Wiadomość
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Opisz swoje pytanie lub problem..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Wyślij wiadomość
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Section */}
          <TabsContent value="support" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Wsparcie techniczne</CardTitle>
                  <CardDescription>
                    Potrzebujesz pomocy z Twoim rowerem?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Nasz zespół techników jest gotowy, aby pomóc Ci z każdym
                    problemem technicznym dotyczącym Twojego roweru. Oferujemy
                    profesjonalne doradztwo, diagnostykę i naprawy.
                  </p>
                  <div className="rounded-lg border bg-muted p-4">
                    <h3 className="font-medium">Serwis rowerowy</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Oferujemy pełen zakres usług serwisowych, od podstawowych
                      przeglądów po zaawansowane naprawy.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/serwis">Umów serwis</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Wsparcie telefoniczne</p>
                      <a
                        href="tel:+48123456789"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        +48 123 456 789 (wew. 2)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Czat online</p>
                      <p className="text-sm text-muted-foreground">
                        Dostępny w dni robocze w godzinach 9:00 - 17:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Najczęstsze problemy techniczne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="tech-1">
                        <AccordionTrigger>
                          Jak wyregulować przerzutki?
                        </AccordionTrigger>
                        <AccordionContent>
                          Regulacja przerzutek wymaga dostosowania śrub
                          ograniczających i napięcia linki. Zalecamy obejrzenie
                          naszego poradnika wideo lub wizytę w serwisie, jeśli
                          nie masz doświadczenia.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="tech-2">
                        <AccordionTrigger>
                          Jak naprawić przebitą dętkę?
                        </AccordionTrigger>
                        <AccordionContent>
                          Aby naprawić przebitą dętkę, zdejmij koło, wyjmij
                          dętkę, zlokalizuj przebicie, zszorstkuj powierzchnię,
                          nałóż klej i łatkę, a następnie złóż wszystko z
                          powrotem.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="tech-3">
                        <AccordionTrigger>
                          Jak często serwisować rower?
                        </AccordionTrigger>
                        <AccordionContent>
                          Zalecamy podstawowy przegląd roweru co 3-6 miesięcy, w
                          zależności od intensywności użytkowania. Pełny serwis
                          warto wykonać raz w roku.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="tech-4">
                        <AccordionTrigger>
                          Jak dbać o łańcuch rowerowy?
                        </AccordionTrigger>
                        <AccordionContent>
                          Łańcuch należy regularnie czyścić i smarować. Używaj
                          specjalnych środków do czyszczenia łańcucha, a
                          następnie nakładaj olej przeznaczony do łańcuchów
                          rowerowych.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Poradniki i instrukcje</CardTitle>
                    <CardDescription>
                      Sprawdź nasze materiały edukacyjne
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Link
                        href="/poradniki/regulacja-hamulcow"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Jak wyregulować hamulce tarczowe
                      </Link>
                      <Link
                        href="/poradniki/wymiana-opon"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Wymiana opon i dętek - krok po kroku
                      </Link>
                      <Link
                        href="/poradniki/przygotowanie-do-sezonu"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Jak przygotować rower do sezonu
                      </Link>
                      <Link
                        href="/poradniki/konserwacja-roweru"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Podstawowa konserwacja roweru
                      </Link>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/poradniki">Zobacz wszystkie poradniki</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Central content — verify with the owner before publishing.
import windowView from "@/assets/bt/window-view.webp";
import livingKitchen from "@/assets/bt/living-kitchen.webp";
import livingRoom from "@/assets/bt/living-room.webp";
import balconyDoor from "@/assets/bt/balcony-door.webp";
import seaView from "@/assets/bt/sea-view.webp";
import seaCurtains from "@/assets/bt/sea-curtains.webp";
import masterBedroom from "@/assets/bt/master-bedroom.webp";
import secondBedroom from "@/assets/bt/second-bedroom.webp";
import balconyMarina from "@/assets/bt/balcony-marina.webp";
import oldTownBalcony from "@/assets/bt/old-town-balcony.webp";
import exterior from "@/assets/bt/exterior.webp";
import balconyDoor2 from "@/assets/bt/balcony-door-2.webp";
import marinaAerial from "@/assets/bt/marina-aerial.webp";
import townAerial from "@/assets/bt/town-aerial.webp";

export const images = {
  windowView, livingKitchen, livingRoom, balconyDoor, seaView, seaCurtains,
  masterBedroom, secondBedroom, balconyMarina, oldTownBalcony, exterior,
  balconyDoor2, marinaAerial, townAerial,
};

export const property = {
  name: "BlueTown",
  city: "Fethiye",
  address: "Cumhuriyet Mah., 45. Sok., No: 41, Fethiye / Muğla",
  phone: "+90 532 335 8622",
  phoneHref: "tel:+905323358622",
  whatsappHref: "https://wa.me/905323358622",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Cumhuriyet Mahallesi 45. Sokak No 41 Fethiye Muğla"),
  // TODO: replace with the property's exact Booking.com listing URL.
  bookingHref: "https://www.booking.com/searchresults.html?ss=BlueTown+Fethiye",
  checkIn: "15:00 – 23:00",
  checkOut: "08:00 – 11:00",
};

export const nav = [
  { label: "Residence", href: "#residence" },
  { label: "The View", href: "#view" },
  { label: "Amenities", href: "#amenities" },
  { label: "Fethiye", href: "#discover" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export const rooms = [
  { title: "Living Room", note: "Turquoise sofa, sea light", img: livingRoom, shape: "tall" },
  { title: "Kitchen", note: "Fully equipped, open plan", img: livingKitchen, shape: "wide" },
  { title: "Master Bedroom", note: "Queen bed", img: masterBedroom, shape: "square" },
  { title: "Second Bedroom", note: "Two single beds", img: secondBedroom, shape: "tall" },
] as const;

export const amenities = [
  { title: "Two Bedrooms", note: "Queen bed, two singles and a sofa bed" },
  { title: "Sea View", note: "Balcony facing the marina and the bay" },
  { title: "Private Kitchen", note: "Fully equipped for longer stays" },
  { title: "Air Conditioning", note: "Cool rooms through summer" },
  { title: "Wi-Fi", note: "Throughout the residence" },
  { title: "Washing Machine", note: "In the apartment" },
  { title: "Central Location", note: "Near Paspatur Bazaar and the marina" },
];

export const discover = [
  { key: "Paspatur Old Town", title: "Paspatur Old Town", text: "Narrow lanes, bougainvillea and small cafés — the historic bazaar is a short walk from the door.", img: oldTownBalcony },
  { key: "Fethiye Marina", title: "Fethiye Marina", text: "Gulets and sailboats rest in the bay, right in front of the balcony.", img: marinaAerial },
  { key: "Local Streets", title: "Local Streets", text: "The everyday life of central Fethiye: palms, roundabouts and whitewashed houses.", img: townAerial },
  { key: "Coastal Experiences", title: "Coastal Experiences", text: "Boat days, island hopping and sunsets over the mountains begin at the waterfront.", img: balconyMarina },
];

export const gallery = [
  { src: seaView, alt: "Fethiye bay with sailboats and mountains" },
  { src: livingRoom, alt: "Living room with turquoise sofa" },
  { src: livingKitchen, alt: "Kitchen and living area" },
  { src: windowView, alt: "Sea view through the window" },
  { src: masterBedroom, alt: "Master bedroom with queen bed" },
  { src: secondBedroom, alt: "Second bedroom with single beds" },
  { src: balconyDoor, alt: "Balcony door opening to the marina" },
  { src: balconyMarina, alt: "Balcony view over the marina" },
  { src: seaCurtains, alt: "Bay view framed by curtains" },
  { src: exterior, alt: "Building exterior" },
  { src: marinaAerial, alt: "Aerial view of Fethiye marina" },
  { src: townAerial, alt: "Aerial view of central Fethiye" },
];

export const faq = [
  { q: "What time is check-in?", a: `Check-in is between ${property.checkIn}.` },
  { q: "What time is check-out?", a: `Check-out is between ${property.checkOut}.` },
  { q: "Is Wi-Fi available?", a: "Yes, Wi-Fi is available in the residence." },
  { q: "Is there a kitchen?", a: "Yes, a fully equipped private kitchen." },
  { q: "How can I make a reservation?", a: `Book through Booking.com or call us at ${property.phone}.` },
  { q: "Where is BlueTown located?", a: `${property.address} — close to Paspatur Bazaar and the marina.` },
];

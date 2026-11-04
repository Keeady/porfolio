import {
  Bike,
  Car,
  Compass,
  Globe2,
  HelpCircle,
  Home,
  Search,
  ShoppingBag,
  Smartphone,
  Soup,
  Store,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type QuestionType =
  | "tiles" // pick one tile
  | "multi" // pick several tiles
  | "dropdown" // pick one from a select
  | "text" // long free text
  | "short"; // single-line free text (e.g. email)

export interface Option {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface Question {
  id: string;
  section: string;
  prompt: string;
  help?: string;
  type: QuestionType;
  required?: boolean;
  options?: Option[];
  /** Adds an "Other" choice that reveals a free-text box (tiles, multi, dropdown). */
  allowOther?: boolean;
  placeholder?: string;
  inputType?: "text" | "email";
  maxLength?: number;
}

export const QUESTIONNAIRE_ID = "customer-discovery-v1";
export const OTHER_VALUE = "other";

export const QUESTIONNAIRE_META = {
  eyebrow: "Customer Questionnaire",
  title: "Help us understand how you find and order food",
  subtitle:
    "About 5 minutes. There are no right answers, and we're not selling anything. Tell us about what actually happened, not what you think you'd do.",
};

export const QUESTIONS: Question[] = [
  // ---- Warm-up ----
  {
    id: "order_frequency",
    section: "Warm-up",
    prompt: "How often do you eat out or order in?",
    type: "dropdown",
    required: true,
    options: [
      { value: "daily", label: "Almost every day" },
      { value: "few_per_week", label: "A few times a week" },
      { value: "weekly", label: "About once a week" },
      { value: "few_per_month", label: "A few times a month" },
      { value: "rarely", label: "Rarely" },
    ],
  },
  {
    id: "discovery_channels",
    section: "Warm-up",
    prompt: "When you want to try something new, how do you decide where to go?",
    help: "Select all that apply.",
    type: "multi",
    required: true,
    allowOther: true,
    options: [
      { value: "google_maps", label: "Google / Maps", icon: Search },
      { value: "social", label: "Instagram / TikTok", icon: Smartphone },
      { value: "friends", label: "Friends & family", icon: Users },
      { value: "delivery_apps", label: "Delivery apps", icon: Car },
      { value: "walk_by", label: "I walk or drive by", icon: Compass },
    ],
  },

  // ---- History ----
  {
    id: "cuisines_tried",
    section: "Your history with African & Black food",
    prompt: "Which of these have you eaten?",
    help: "Select all that apply.",
    type: "multi",
    required: true,
    options: [
      { value: "west_african", label: "West African", icon: Soup },
      { value: "east_african", label: "East African", icon: Soup },
      { value: "caribbean", label: "Caribbean", icon: Globe2 },
      { value: "soul_southern", label: "Soul / Southern", icon: Utensils },
      { value: "none_yet", label: "None yet", icon: HelpCircle },
    ],
  },
  {
    id: "barriers",
    section: "Your history with African & Black food",
    prompt: "If you haven't tried it, or don't order it often, what gets in the way?",
    help: "Select all that apply.",
    type: "multi",
    allowOther: true,
    options: [
      { value: "dont_know_where", label: "Don't know where to go" },
      { value: "dont_know_dishes", label: "Don't know what the dishes are" },
      { value: "spice_worry", label: "Worried about spice or ingredients" },
      { value: "not_nearby", label: "Nothing good nearby" },
      { value: "not_on_apps", label: "Not on the apps I use" },
      { value: "never_thought", label: "Never thought about it" },
    ],
  },

  // ---- Last attempt ----
  {
    id: "last_attempt_story",
    section: "The last time you tried",
    prompt:
      "Tell us about the last time you tried to find or order African food, or thought about it. What happened?",
    help: "Where did you look? What did you search for? What did you do next?",
    type: "text",
    required: true,
    placeholder: "Walk us through it, step by step...",
    maxLength: 2000,
  },
  {
    id: "confusion_points",
    section: "The last time you tried",
    prompt: "What was confusing or frustrating?",
    help: "Select all that apply.",
    type: "multi",
    allowOther: true,
    options: [
      { value: "dish_names", label: "Dish names" },
      { value: "ingredients", label: "What's in the dish" },
      { value: "where_to_go", label: "Where to go" },
      { value: "spice_level", label: "How spicy it is" },
      { value: "how_to_order", label: "How to order" },
      { value: "nothing", label: "Nothing, it was easy" },
    ],
  },
  {
    id: "attempt_outcome",
    section: "The last time you tried",
    prompt: "How did it end?",
    type: "tiles",
    required: true,
    options: [
      { value: "ordered_loved", label: "Ordered and loved it" },
      { value: "ordered_meh", label: "Ordered, wasn't sure about it" },
      { value: "played_safe", label: "Picked something safe instead" },
      { value: "gave_up", label: "Gave up" },
    ],
  },

  // ---- Confidence & trust ----
  {
    id: "menu_helpers",
    section: "Confidence and trust",
    prompt: "At a menu you don't recognize, what helps you choose?",
    help: "Select all that apply.",
    type: "multi",
    allowOther: true,
    options: [
      { value: "photos", label: "Photos of the food" },
      { value: "descriptions", label: "Plain-language descriptions" },
      { value: "spice_info", label: "Spice level & ingredients" },
      { value: "recommendation", label: "A first-timer's recommendation" },
      { value: "reviews", label: "Reviews" },
      { value: "ask_staff", label: "Asking staff" },
    ],
  },
  {
    id: "trust_signal",
    section: "Confidence and trust",
    prompt: "What most tells you a small restaurant or home kitchen is trustworthy?",
    type: "dropdown",
    allowOther: true,
    options: [
      { value: "reviews", label: "Reviews and ratings" },
      { value: "friend_rec", label: "A friend recommended it" },
      { value: "social_presence", label: "Active social media" },
      { value: "licensing", label: "Licensing or health inspection" },
      { value: "food_photos", label: "Photos of the food" },
    ],
  },
  {
    id: "ownership_matters",
    section: "Confidence and trust",
    prompt: "How much does it matter that a place is Black-owned or authentic to a specific region?",
    type: "tiles",
    required: true,
    options: [
      { value: "very", label: "Very much" },
      { value: "somewhat", label: "Somewhat" },
      { value: "little", label: "A little" },
      { value: "not_at_all", label: "Not at all" },
    ],
  },

  // ---- Logistics ----
  {
    id: "order_method",
    section: "Ordering logistics",
    prompt: "How do you usually get your food?",
    help: "Select all that apply.",
    type: "multi",
    required: true,
    options: [
      { value: "dine_in", label: "Dine in", icon: Store },
      { value: "pickup", label: "Pick up", icon: ShoppingBag },
      { value: "delivery", label: "Delivery", icon: Bike },
      { value: "cook_home", label: "Mostly cook at home", icon: Home },
    ],
  },
  {
    id: "order_trigger",
    section: "Ordering logistics",
    prompt: "What would make you order from a vendor you found online, rather than just saving it?",
    type: "text",
    placeholder: "Anything that would tip you over the edge...",
    maxLength: 2000,
  },

  // ---- Wrap-up ----
  {
    id: "change_one_thing",
    section: "Wrap-up",
    prompt: "If you could change one thing about trying new foods, what would it be?",
    type: "text",
    placeholder: "One thing...",
    maxLength: 2000,
  },
  {
    id: "prototype_followup",
    section: "Wrap-up",
    prompt: "Would you be willing to try an early prototype?",
    type: "tiles",
    options: [
      { value: "yes", label: "Yes" },
      { value: "maybe", label: "Maybe later" },
      { value: "no", label: "No thanks" },
    ],
  },
  {
    id: "contact_email",
    section: "Wrap-up",
    prompt: "Email (optional)",
    help: "Only if you'd like a short update on what we learn.",
    type: "short",
    inputType: "email",
    placeholder: "you@example.com",
    maxLength: 254,
  },
];

export async function submitForm(data: any) {
  const url = process.env.API_HOST;
  if (!url) {
    return;
  }

  try {
    const res = await fetch(`${url}/questionnaires`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
}

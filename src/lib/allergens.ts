/**
 * Menüde gösterilen ve yönetim panelinden ürün bazında seçilen alerjen listesi.
 * Türk Gıda Kodeksi ve AB 1169/2011 sayılı mevzuatına uygun 14 temel alerjen.
 * Sıralama, panelde ve menüde aynı düzende gösterilmek için burada sabittir.
 */

export type AllergenId =
  | "gluten"
  | "kabuklu-deniz"
  | "yumurta"
  | "balik"
  | "yer-fistigi"
  | "soya"
  | "sut"
  | "kuruyemis"
  | "kereviz"
  | "hardal"
  | "susam"
  | "sulfit"
  | "aci-bakla"
  | "yumusakcalar";

export type Allergen = {
  id: AllergenId;
  name_tr: string;
  name_en: string;
  /** Panelde seçim yaparken ve bilgilendirme modalında gösterilen açıklama. */
  hint_tr: string;
  hint_en: string;
  /** Katalogdaki gruplama (yalnızca panelde başlık olarak kullanılır). */
  group: "temel" | "yemek" | "gizli";
};

export const ALLERGEN_GROUPS: Record<Allergen["group"], string> = {
  temel: "Temel ve Yaygın Alerjenler",
  yemek: "Deniz ve Yemek Odaklı Alerjenler",
  gizli: "Gizli ve Katkı Odaklı Alerjenler",
};

export const ALLERGENS: Allergen[] = [
  {
    id: "gluten",
    name_tr: "Glüten İçeren Tahıllar",
    name_en: "Cereals Containing Gluten",
    hint_tr:
      "Buğday (kılçıksız buğday ve kamut dahil), çavdar, arpa, yulaf veya bunların hibrit türleri ve ürünleri (un, ekmek, makarna, hamur işleri vb.).",
    hint_en:
      "Wheat (including spelt and khorasan/kamut), rye, barley, oats and their hybridized strains and bakery products.",
    group: "temel",
  },
  {
    id: "kabuklu-deniz",
    name_tr: "Kabuklular (Crustacea)",
    name_en: "Crustaceans",
    hint_tr:
      "Karides, kerevit, ıstakoz, yengeç ve bunlardan elde edilen ürünler ile soslar.",
    hint_en:
      "Crab, lobster, prawn, scampi, crayfish and their products.",
    group: "yemek",
  },
  {
    id: "yumurta",
    name_tr: "Yumurta ve Yumurta Ürünleri",
    name_en: "Eggs & Egg Products",
    hint_tr:
      "Kekler, pastalar, kurabiyeler, mayonez, krepler, sufleler, soslar ve kahvaltı tabakları.",
    hint_en:
      "Cakes, pastries, cookies, mayonnaise, crepes, sauces and breakfast dishes.",
    group: "temel",
  },
  {
    id: "balik",
    name_tr: "Balık ve Balık Ürünleri",
    name_en: "Fish & Fish Products",
    hint_tr:
      "Balık ve balık ürünleri, çorbalar, Sezar salata sosu (içeriğindeki ançüez/sardalya nedeniyle), balık sosu vb.",
    hint_en:
      "Fish varieties, fish soups, Caesar dressings (with anchovies), fish sauces.",
    group: "yemek",
  },
  {
    id: "yer-fistigi",
    name_tr: "Yerfıstığı ve Yerfıstığı Ürünleri",
    name_en: "Peanuts & Peanut Products",
    hint_tr:
      "Yerfıstığı ezmesi, fıstıklı tatlılar, kurabiyeler, bazı çikolatalar ve soslar.",
    hint_en:
      "Peanut butter, cookies, pastries, chocolates and certain sauces.",
    group: "temel",
  },
  {
    id: "soya",
    name_tr: "Soya Fasulyesi ve Ürünleri",
    name_en: "Soybeans & Soy Products",
    hint_tr:
      "Soya sosu, soya sütü, tofu, soya unu, soya lesitini (çikolatalar ve margarinler).",
    hint_en:
      "Soy sauce, soy milk, tofu, soy flour, soy lecithin in chocolates and margarines.",
    group: "yemek",
  },
  {
    id: "sut",
    name_tr: "Süt ve Süt Ürünleri (Laktoz dahil)",
    name_en: "Milk & Dairy (incl. lactose)",
    hint_tr:
      "Süt, tereyağı, peynir çeşitleri, krema, yoğurt, dondurma, kahveler (latte, cappuccino) ve sütlü tatlılar.",
    hint_en:
      "Milk, butter, cheese, cream, yogurt, ice cream, coffee drinks (latte, cappuccino) and dairy desserts.",
    group: "temel",
  },
  {
    id: "kuruyemis",
    name_tr: "Sert Kabuklu Meyveler (Kuruyemişler)",
    name_en: "Tree Nuts",
    hint_tr:
      "Badem, fındık, ceviz, kaju, pikan cevizi, Brezilya fındığı, Antep fıstığı, macadamia fındığı ve ürünleri.",
    hint_en:
      "Almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, macadamia nuts and their products.",
    group: "temel",
  },
  {
    id: "kereviz",
    name_tr: "Kereviz ve Kereviz Ürünleri",
    name_en: "Celery & Celery Products",
    hint_tr:
      "Kereviz sapı, yaprağı, tohumu, kökü, çorbalar, sebze ve et suyu bazlı soslar, salatalar.",
    hint_en:
      "Celery stalks, leaves, seeds, root, soups, stock, dressings and salads.",
    group: "gizli",
  },
  {
    id: "hardal",
    name_tr: "Hardal ve Hardal Ürünleri",
    name_en: "Mustard & Mustard Products",
    hint_tr:
      "Hardal tohumu, hardal tozu, salata sosları (vinaigrette), mayonez, marinasyon ve sandviç sosları.",
    hint_en:
      "Mustard seeds, powder, salad dressings, marinades and sandwich sauces.",
    group: "gizli",
  },
  {
    id: "susam",
    name_tr: "Susam Tohumu ve Ürünleri",
    name_en: "Sesame Seeds & Products",
    hint_tr:
      "Simit, poğaça, ekmekler, tahin (tahinli çörek, helva, humus), susam yağı ve soslar.",
    hint_en:
      "Bagels, bakery goods, tahini (hummus, halva), sesame oil and dressings.",
    group: "temel",
  },
  {
    id: "sulfit",
    name_tr: "Kükürt Dioksit ve Sülfitler",
    name_en: "Sulphur Dioxide & Sulphites",
    hint_tr:
      "Toplam SO2 konsantrasyonu 10 mg/kg veya 10 mg/L üzeri olanlar: kurutulmuş meyveler (kuru kayısı, üzüm), şaraplar, sirkeler ve işlenmiş ürünler.",
    hint_en:
      "Concentrations over 10 mg/kg or 10 mg/L: dried fruits, wines, vinegars and processed foods.",
    group: "gizli",
  },
  {
    id: "aci-bakla",
    name_tr: "Acı Bakla (Lupin) ve Ürünleri",
    name_en: "Lupin & Lupin Products",
    hint_tr:
      "Acı bakla unu ve tohumları: bazı ekmekler, börekler, glütensiz ve vegan unlu mamuller.",
    hint_en:
      "Lupin flour and seeds: certain breads, pastries, gluten-free and vegan bakery goods.",
    group: "gizli",
  },
  {
    id: "yumusakcalar",
    name_tr: "Yumuşakçalar ve Ürünleri",
    name_en: "Molluscs & Mollusc Products",
    hint_tr:
      "Midye, kalamar, ahtapot, istiridye, salyangoz, sübye ve bunlardan elde edilen soslar ve ürünler.",
    hint_en:
      "Mussels, squid, octopus, oysters, snails, clams and mollusc-derived products.",
    group: "yemek",
  },
];

const BY_ID = new Map(ALLERGENS.map((allergen) => [allergen.id, allergen]));

export function isAllergenId(value: string): value is AllergenId {
  return BY_ID.has(value as AllergenId);
}

export function getAllergen(id: string): Allergen | undefined {
  return BY_ID.get(id as AllergenId);
}

/** Verilen kimlikleri katalog sırasına göre, geçersizleri atarak döndürür. */
export function sortAllergens(ids: string[]): AllergenId[] {
  const selected = new Set(ids.filter(isAllergenId));
  return ALLERGENS.filter((allergen) => selected.has(allergen.id)).map(
    (allergen) => allergen.id
  );
}

export function allergenNames(ids: string[], lang: "tr" | "en"): string[] {
  return sortAllergens(ids).map((id) => {
    const allergen = BY_ID.get(id)!;
    return lang === "tr" ? allergen.name_tr : allergen.name_en;
  });
}

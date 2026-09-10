/**
 * Menüde gösterilen ve yönetim panelinden ürün bazında seçilen alerjen listesi.
 * Sıralama, panelde ve menüde aynı düzende gösterilmek için burada sabittir.
 */

export type AllergenId =
  | "gluten"
  | "sut"
  | "yumurta"
  | "kuruyemis"
  | "yer-fistigi"
  | "susam"
  | "soya"
  | "balik"
  | "kabuklu-deniz"
  | "hardal"
  | "kereviz"
  | "sulfit"
  | "aci-bakla";

export type Allergen = {
  id: AllergenId;
  name_tr: string;
  name_en: string;
  /** Panelde seçim yaparken gösterilen "nerede bulunur" açıklaması. */
  hint_tr: string;
  /** Katalogdaki gruplama (yalnızca panelde başlık olarak kullanılır). */
  group: "temel" | "yemek" | "gizli";
};

export const ALLERGEN_GROUPS: Record<Allergen["group"], string> = {
  temel: "En yaygın alerjenler (temel gıdalar)",
  yemek: "Yemek ve sos odaklı alerjenler",
  gizli: "Gizli veya yardımcı alerjenler",
};

export const ALLERGENS: Allergen[] = [
  {
    id: "gluten",
    name_tr: "Glüten",
    name_en: "Gluten",
    hint_tr:
      "Buğday, çavdar, arpa, yulaf: ekmek, poğaça, simit, pasta tabanları, kurabiyeler, tartlar, makarnalar ve sosları kıvamlandıran unlar.",
    group: "temel",
  },
  {
    id: "sut",
    name_tr: "Süt ve Süt Ürünleri",
    name_en: "Milk & Dairy",
    hint_tr:
      "Laktoz ve süt proteini: kahveler (latte, cappuccino), tereyağı, krema, peynir çeşitleri, sütlü tatlılar, dondurma ve soslar.",
    group: "temel",
  },
  {
    id: "yumurta",
    name_tr: "Yumurta",
    name_en: "Egg",
    hint_tr:
      "Kekler, pastalar, kurabiyeler, mayonez, krepler, bazı soslar ve kahvaltı tabakları.",
    group: "temel",
  },
  {
    id: "kuruyemis",
    name_tr: "Kuruyemişler",
    name_en: "Tree Nuts",
    hint_tr:
      "Ceviz, badem, fındık, Antep fıstığı, kaju vb.: pastane ürünleri, kurabiyeler, tatlı süslemeleri, pesto sos, makaronlar ve salatalar.",
    group: "temel",
  },
  {
    id: "yer-fistigi",
    name_tr: "Yer Fıstığı",
    name_en: "Peanut",
    hint_tr:
      "Fıstık ezmeli tatlılar, kurabiyeler, bazı çikolatalar ve Asya mutfağı esintili soslar.",
    group: "temel",
  },
  {
    id: "susam",
    name_tr: "Susam",
    name_en: "Sesame",
    hint_tr:
      "Simit, poğaça, hamburger ekmekleri, tahin (humus veya tahinli çörek gibi), salata sosları.",
    group: "temel",
  },
  {
    id: "soya",
    name_tr: "Soya",
    name_en: "Soy",
    hint_tr:
      "Soya sosu, bazı margarinler, vegan menü alternatifleri ve endüstriyel çikolatalar.",
    group: "yemek",
  },
  {
    id: "balik",
    name_tr: "Balık",
    name_en: "Fish",
    hint_tr:
      "Balık çorbaları, ana yemekler, Sezar salata sosu (içeriğindeki ançüez/sardalya nedeniyle).",
    group: "yemek",
  },
  {
    id: "kabuklu-deniz",
    name_tr: "Kabuklu Deniz Ürünleri",
    name_en: "Shellfish",
    hint_tr:
      "Karides, midye, kalamar, yengeç vb.: deniz ürünlü makarnalar, paella, deniz ürünleri tabakları ve uzak doğu mutfağı.",
    group: "yemek",
  },
  {
    id: "hardal",
    name_tr: "Hardal",
    name_en: "Mustard",
    hint_tr:
      "Salata sosları (vinaigrette), mayonez karışımları, marinasyonlar, sandviç ve burger sosları.",
    group: "gizli",
  },
  {
    id: "kereviz",
    name_tr: "Kereviz",
    name_en: "Celery",
    hint_tr:
      "Çorbalar, et suyu veya sebze suyu tabanlı soslar, salatalar ve garnitürler.",
    group: "gizli",
  },
  {
    id: "sulfit",
    name_tr: "Sülfitler",
    name_en: "Sulphites",
    hint_tr:
      "Kükürt dioksit: şaraplar, kurutulmuş meyveler (kuru kayısı/üzüm vb.), bazı sirke çeşitleri ve işlenmiş etler.",
    group: "gizli",
  },
  {
    id: "aci-bakla",
    name_tr: "Acı Bakla (Lupin)",
    name_en: "Lupin",
    hint_tr:
      "Glütensiz un karışımları, bazı ekmekler ve vegan hamur işlerinde kullanılan bitki tohumu.",
    group: "gizli",
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

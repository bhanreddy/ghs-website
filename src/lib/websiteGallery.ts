import staticGallery from "@/content/gallery.json";

export interface WebsiteGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string | null;
  category: string;
  tall?: boolean;
}

interface GalleryApiItem {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  category: string;
}

interface GalleryApiResponse {
  success: boolean;
  school_id: number | string;
  data?: { items?: GalleryApiItem[] };
}

export const WEBSITE_SCHOOL_ID = process.env.SCHOOL_ID || "17";

const fallbackGallery: WebsiteGalleryPhoto[] = staticGallery.images.map((photo, index) => ({
  id: photo.id,
  src: photo.src,
  alt: photo.alt,
  category: photo.category,
  tall: index === 0 || index === 3,
}));

/**
 * Fetch the SchoolIMS-owned gallery for this website's configured school.
 * Static JSON remains a deployment-safe fallback when the API is unavailable;
 * a successful empty response stays empty so an admin can delete every photo.
 */
export async function getWebsiteGallery(): Promise<WebsiteGalleryPhoto[]> {
  const apiBaseUrl = (
    process.env.SCHOOLIMS_API_URL ||
    process.env.NEXT_PUBLIC_SCHOOLIMS_API_URL ||
    ""
  ).replace(/\/$/, "");

  if (!apiBaseUrl) return fallbackGallery;

  try {
    const response = await fetch(
      `${apiBaseUrl}/public/website-gallery?school_id=${encodeURIComponent(WEBSITE_SCHOOL_ID)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) throw new Error(`Gallery API returned ${response.status}`);

    const payload = (await response.json()) as GalleryApiResponse;
    if (!payload.success || String(payload.school_id) !== String(WEBSITE_SCHOOL_ID)) {
      throw new Error("Gallery API returned the wrong school scope");
    }

    const items = payload.data?.items;
    if (!Array.isArray(items)) throw new Error("Gallery API returned an invalid payload");
    return items.map((item, index) => ({
      id: item.id,
      src: item.image_url,
      alt: item.alt_text,
      caption: item.caption,
      category: item.category,
      tall: index === 0 || index % 5 === 3,
    }));
  } catch (error) {
    console.error("[website-gallery] Falling back to bundled gallery:", error);
    return fallbackGallery;
  }
}

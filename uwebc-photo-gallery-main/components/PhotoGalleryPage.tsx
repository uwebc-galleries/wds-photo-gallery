"use client";

import { useEffect, useMemo, useState } from "react";

type Photo = {
  id: string;
  title: string;
  caption: string;
  year: string;
  thumb: string;
  full: string;
  download: string;
};

type EventShareConfig = {
  eventName: string;
  organizerName: string;
  dateLabel: string;
  venueName: string;
  locationName: string;
  galleryPath: string;
  parentUrl: string;
  heroImage: string;
  shareLead: string;
  topics: string[];
  hashtags: string[];
};

type ShareChannel = {
  id: "native" | "linkedin" | "facebook" | "instagram" | "email";
  label: string;
};

const eventConfig: EventShareConfig = {
  eventName: "Wisconsin Digital Symposium",
  organizerName: "UWEBC",
  dateLabel: "June 1, 2026",
  venueName: "Lambeau Field",
  locationName: "Green Bay",
  galleryPath: "https://uwebc.wisc.edu/wisconsin-digital-symposium/photos/",
  parentUrl: "https://uwebc.wisc.edu/wisconsin-digital-symposium/",
  heroImage: "/photos/2026-wds/full/wds-2026-10.jpg",
  shareLead:
    "Sharing a few moments from the 2026 Wisconsin Digital Symposium at Lambeau Field.",
  topics: [
    "AI",
    "analytics",
    "platforms",
    "automation",
    "digital strategy",
    "manufacturing innovation",
  ],
  hashtags: [
    "WisconsinDigitalSymposium",
    "UWEBC",
    "DigitalTransformation",
    "AI",
  ],
};

const shareChannels: ShareChannel[] = [
  { id: "native", label: "Device Share" },
  { id: "linkedin", label: "Copy text + open LinkedIn" },
  { id: "facebook", label: "Copy text + open Facebook" },
  { id: "instagram", label: "Copy text + open Instagram" },
  { id: "email", label: "Open email" },
];

const maxSelectedPhotos = 3;

const galleryPhotos: Photo[] = [
  {
    id: "wds-2026-arrival-networking",
    title: "Arrival Networking",
    caption:
      "Attendees connected during arrival and breakfast networking at the 2026 Wisconsin Digital Symposium.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-01.jpg",
    full: "/photos/2026-wds/full/wds-2026-01.jpg",
    download: "/photos/2026-wds/full/wds-2026-01.jpg",
  },
  {
    id: "wds-2026-registration-conversations",
    title: "Registration Conversations",
    caption:
      "Guests checked in and caught up with peers before the formal program began.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-02.jpg",
    full: "/photos/2026-wds/full/wds-2026-02.jpg",
    download: "/photos/2026-wds/full/wds-2026-02.jpg",
  },
  {
    id: "wds-2026-peer-conversation",
    title: "Peer Conversation",
    caption:
      "Digital leaders compared priorities and practical lessons between sessions.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-03.jpg",
    full: "/photos/2026-wds/full/wds-2026-03.jpg",
    download: "/photos/2026-wds/full/wds-2026-03.jpg",
  },
  {
    id: "wds-2026-lambeau-networking",
    title: "Lambeau Networking",
    caption:
      "Attendees continued conversations in the Lambeau Field event space.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-04.jpg",
    full: "/photos/2026-wds/full/wds-2026-04.jpg",
    download: "/photos/2026-wds/full/wds-2026-04.jpg",
  },
  {
    id: "wds-2026-event-giveaways",
    title: "Event Giveaways",
    caption:
      "Branded event materials and giveaways welcomed Symposium attendees.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-05.jpg",
    full: "/photos/2026-wds/full/wds-2026-05.jpg",
    download: "/photos/2026-wds/full/wds-2026-05.jpg",
  },
  {
    id: "wds-2026-roundtable-discussion",
    title: "Roundtable Discussion",
    caption:
      "Small-group conversation created space for questions, context, and connection.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-06.jpg",
    full: "/photos/2026-wds/full/wds-2026-06.jpg",
    download: "/photos/2026-wds/full/wds-2026-06.jpg",
  },
  {
    id: "wds-2026-table-conversation",
    title: "Table Conversation",
    caption:
      "Peers used the Symposium setting to exchange ideas in a more focused format.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-07.jpg",
    full: "/photos/2026-wds/full/wds-2026-07.jpg",
    download: "/photos/2026-wds/full/wds-2026-07.jpg",
  },
  {
    id: "wds-2026-sponsor-exchange",
    title: "Sponsor Exchange",
    caption:
      "Attendees and partners discussed opportunities around digital capability building.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-08.jpg",
    full: "/photos/2026-wds/full/wds-2026-08.jpg",
    download: "/photos/2026-wds/full/wds-2026-08.jpg",
  },
  {
    id: "wds-2026-partner-conversation",
    title: "Partner Conversation",
    caption:
      "A partner conversation continued during the Symposium networking portions of the day.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-09.jpg",
    full: "/photos/2026-wds/full/wds-2026-09.jpg",
    download: "/photos/2026-wds/full/wds-2026-09.jpg",
  },
  {
    id: "wds-2026-atrium-networking",
    title: "Atrium Networking",
    caption:
      "The Lambeau Field atrium gave attendees room to meet partners and reconnect with peers.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-10.jpg",
    full: "/photos/2026-wds/full/wds-2026-10.jpg",
    download: "/photos/2026-wds/full/wds-2026-10.jpg",
  },
  {
    id: "wds-2026-sponsor-table",
    title: "Sponsor Table",
    caption:
      "Innovation partners welcomed attendees and shared resources throughout the event.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-11.jpg",
    full: "/photos/2026-wds/full/wds-2026-11.jpg",
    download: "/photos/2026-wds/full/wds-2026-11.jpg",
  },
  {
    id: "wds-2026-partner-connections",
    title: "Partner Connections",
    caption:
      "Members, partners, and guests compared digital transformation priorities between sessions.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-12.jpg",
    full: "/photos/2026-wds/full/wds-2026-12.jpg",
    download: "/photos/2026-wds/full/wds-2026-12.jpg",
  },
  {
    id: "wds-2026-peer-networking",
    title: "Peer Networking",
    caption:
      "Attendees built relationships across technology, data, operations, and executive leadership.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-13.jpg",
    full: "/photos/2026-wds/full/wds-2026-13.jpg",
    download: "/photos/2026-wds/full/wds-2026-13.jpg",
  },
  {
    id: "wds-2026-hallway-conversation",
    title: "Hallway Conversation",
    caption:
      "Informal conversations gave attendees a chance to keep the program discussion moving.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-14.jpg",
    full: "/photos/2026-wds/full/wds-2026-14.jpg",
    download: "/photos/2026-wds/full/wds-2026-14.jpg",
  },
  {
    id: "wds-2026-small-group-exchange",
    title: "Small Group Exchange",
    caption:
      "Small-group exchanges helped participants connect lessons from the event to their own work.",
    year: "2026",
    thumb: "/photos/2026-wds/thumb/wds-2026-15.jpg",
    full: "/photos/2026-wds/full/wds-2026-15.jpg",
    download: "/photos/2026-wds/full/wds-2026-15.jpg",
  },
];

function getPhotoUrl(baseUrl: string, photo: Photo) {
  return `${baseUrl}#${photo.id}`;
}

function getCurrentBaseUrl() {
  if (typeof window === "undefined") {
    return eventConfig.galleryPath;
  }

  const { origin, pathname, search } = window.location;
  return `${origin}${pathname}${search}`;
}

function getPhotoFilename(config: EventShareConfig, photo: Photo) {
  const slug = `${config.eventName}-${photo.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const extension = photo.download.includes(".png") ? "png" : "jpg";

  return `${slug}.${extension}`;
}

function buildShareText(
  config: EventShareConfig,
  selectedPhotos: Photo[],
  pageBaseUrl: string,
) {
  const topicText = config.topics.length
    ? ` Conversations centered on ${config.topics.join(", ")}.`
    : "";
  const photoText =
    selectedPhotos.length > 0
      ? `\n\nSelected photos:\n${selectedPhotos
          .map((photo) => `${photo.title}: ${getPhotoUrl(pageBaseUrl, photo)}`)
          .join("\n")}`
      : `\n\nPhoto gallery: ${pageBaseUrl}`;
  const hashtagText = config.hashtags
    .map((hashtag) => `#${hashtag.replace(/^#/, "")}`)
    .join(" ");

  return `${config.shareLead}\n\n${config.eventName} | ${config.organizerName} | ${config.dateLabel} | ${config.venueName}, ${config.locationName}.${topicText}${photoText}\n\n${hashtagText}`;
}

export default function PhotoGalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [pageBaseUrl, setPageBaseUrl] = useState(eventConfig.galleryPath);

  const selectedPhoto =
    selectedIndex === null ? null : galleryPhotos[selectedIndex];
  const selectedPhotos = useMemo(
    () =>
      selectedPhotoIds
        .map((id) => galleryPhotos.find((photo) => photo.id === id))
        .filter((photo): photo is Photo => Boolean(photo)),
    [selectedPhotoIds],
  );
  const shareText = useMemo(
    () => buildShareText(eventConfig, selectedPhotos, pageBaseUrl),
    [pageBaseUrl, selectedPhotos],
  );

  useEffect(() => {
    setPageBaseUrl(getCurrentBaseUrl());

    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const photoIndex = galleryPhotos.findIndex((photo) => photo.id === hash);
    if (photoIndex >= 0) {
      setSelectedIndex(photoIndex);
    }
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        movePhoto(1);
      }

      if (event.key === "ArrowLeft") {
        movePhoto(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  function openPhoto(index: number) {
    const photo = galleryPhotos[index];
    setSelectedIndex(index);
    window.history.replaceState(null, "", getPhotoUrl(pageBaseUrl, photo));
  }

  function closeLightbox() {
    setSelectedIndex(null);
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function movePhoto(direction: number) {
    if (selectedIndex === null) {
      return;
    }

    const nextIndex =
      (selectedIndex + direction + galleryPhotos.length) % galleryPhotos.length;
    setSelectedIndex(nextIndex);
    window.history.replaceState(
      null,
      "",
      getPhotoUrl(pageBaseUrl, galleryPhotos[nextIndex]),
    );
  }

  function togglePhotoSelection(photoId: string) {
    setSelectedPhotoIds((current) => {
      if (current.includes(photoId)) {
        return current.filter((id) => id !== photoId);
      }

      if (current.length >= maxSelectedPhotos) {
        setCopyStatus("selection-limit");
        window.setTimeout(() => setCopyStatus(null), 1800);
        return current;
      }

      return [...current, photoId];
    });
  }

  async function copyToClipboard(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(key);
      window.setTimeout(() => setCopyStatus(null), 1600);
    } catch {
      setCopyStatus("copy-error");
      window.setTimeout(() => setCopyStatus(null), 2200);
    }
  }

  async function buildShareFiles(photos: Photo[]) {
    const files = await Promise.all(
      photos.map(async (photo) => {
        const response = await fetch(photo.full);
        const blob = await response.blob();
        const extension = blob.type.includes("png") ? "png" : "jpg";
        return new File([blob], `${photo.id}.${extension}`, {
          type: blob.type || "image/jpeg",
        });
      }),
    );

    return files;
  }

  async function shareSelection() {
    const shareData = {
      title: eventConfig.eventName,
      text: shareText,
      url: pageBaseUrl,
    };

    try {
      if (navigator.share) {
        if (selectedPhotos.length > 0 && navigator.canShare) {
          const files = await buildShareFiles(selectedPhotos);
          if (navigator.canShare({ files })) {
            await navigator.share({ ...shareData, files });
            return;
          }
        }

        await navigator.share(shareData);
        return;
      }
    } catch {
      await copyToClipboard(shareText, "share-fallback");
      return;
    }

    await copyToClipboard(shareText, "share-fallback");
  }

  function downloadSelectedPhotos() {
    if (selectedPhotos.length === 0) {
      setCopyStatus("download-empty");
      window.setTimeout(() => setCopyStatus(null), 2200);
      return;
    }

    selectedPhotos.forEach((photo, index) => {
      window.setTimeout(() => {
        const link = document.createElement("a");
        link.href = photo.download;
        link.download = getPhotoFilename(eventConfig, photo);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.append(link);
        link.click();
        link.remove();
      }, index * 180);
    });

    setCopyStatus("download-started");
    window.setTimeout(() => setCopyStatus(null), 2600);
  }

  function openShareWindow(channelId: ShareChannel["id"]) {
    if (channelId === "native") {
      void shareSelection();
      return;
    }

    const encodedUrl = encodeURIComponent(pageBaseUrl);
    const encodedText = encodeURIComponent(shareText);

    if (channelId === "linkedin") {
      void copyToClipboard(shareText, "channel-linkedin");
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (channelId === "facebook") {
      void copyToClipboard(shareText, "channel-facebook");
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (channelId === "instagram") {
      void copyToClipboard(shareText, "channel-instagram");
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = `mailto:?subject=${encodeURIComponent(
      `${eventConfig.eventName} photos`,
    )}&body=${encodedText}`;
  }

  return (
    <main className="wds-page">
      <SiteHeader />

      <section className="wds-hero" aria-labelledby="gallery-title">
        <img className="wds-hero__image" src={eventConfig.heroImage} alt="" />
        <div className="wds-hero__content">
          <p className="wds-eyebrow">{eventConfig.eventName}</p>
          <h1 id="gallery-title">Photo Gallery</h1>
          <p>
            Still photography from {eventConfig.organizerName}&apos;s gathering
            at {eventConfig.venueName} in {eventConfig.locationName}.
          </p>
        </div>
      </section>

      <section className="wds-band wds-band--intro">
        <div className="wds-container wds-intro">
          <nav className="wds-breadcrumbs" aria-label="Breadcrumb">
            <a href="https://uwebc.wisc.edu/">Home</a>
            <span>/</span>
            <a href={eventConfig.parentUrl}>{eventConfig.eventName}</a>
            <span>/</span>
            <span>Photos</span>
          </nav>

          <div className="wds-intro__copy">
            <h2>Share the moments that carried the day.</h2>
            <p>
              {eventConfig.dateLabel} at {eventConfig.venueName} brought
              members and partners together for practical conversations around{" "}
              {eventConfig.topics.join(", ")}.
            </p>
          </div>

          <div className="wds-stat-strip" aria-label="Gallery summary">
            <span>{galleryPhotos.length} photos</span>
            <span>{eventConfig.dateLabel}</span>
            <span>{eventConfig.venueName}</span>
            <span>Select up to {maxSelectedPhotos}</span>
          </div>
        </div>
      </section>

      <section className="wds-band">
        <div className="wds-container">
          <div className="wds-section-heading">
            <p className="wds-eyebrow">Gallery</p>
            <h2>{eventConfig.eventName} Photography</h2>
          </div>

          <div className="wds-selection-panel">
            <div>
              <h3>Selected for Sharing</h3>
              <p>
                {selectedPhotos.length} of {maxSelectedPhotos} photos selected
              </p>
            </div>
            {selectedPhotos.length > 0 ? (
              <div className="wds-selected-list">
                {selectedPhotos.map((photo) => (
                  <button
                    className="wds-selected-photo"
                    key={photo.id}
                    onClick={() => togglePhotoSelection(photo.id)}
                    type="button"
                  >
                    <img src={photo.thumb} alt="" />
                    <span>{photo.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="wds-selection-empty">
                Choose photos from the gallery to build a share set.
              </p>
            )}
            {selectedPhotos.length > 0 && (
              <button
                className="wds-secondary-button"
                onClick={() => setSelectedPhotoIds([])}
                type="button"
              >
                Clear selection
              </button>
            )}
          </div>

          <div className="wds-gallery" aria-label="Photo thumbnails">
            {galleryPhotos.map((photo, index) => {
              const isSelected = selectedPhotoIds.includes(photo.id);
              const disabled =
                !isSelected && selectedPhotoIds.length >= maxSelectedPhotos;

              return (
                <article
                  className={`wds-photo-card ${
                    isSelected ? "is-selected" : ""
                  }`}
                  key={photo.id}
                >
                  <button
                    className="wds-photo-card__preview"
                    onClick={() => openPhoto(index)}
                    type="button"
                  >
                    <span className="wds-photo-card__image-wrap">
                      <img src={photo.thumb} alt={photo.title} loading="lazy" />
                    </span>
                    <span className="wds-photo-card__meta">
                      <span>
                        <strong>{photo.title}</strong>
                        <small>{photo.year}</small>
                      </span>
                    </span>
                  </button>
                  <button
                    className="wds-select-button"
                    disabled={disabled}
                    onClick={() => togglePhotoSelection(photo.id)}
                    type="button"
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wds-band wds-band--share">
        <div className="wds-container">
          <div className="wds-section-heading">
            <p className="wds-eyebrow">Share</p>
            <h2>Suggested Text and Hashtags</h2>
          </div>

          <article className="wds-share-card wds-share-card--wide">
            <div className="wds-share-card__top">
              <div>
                <h3>
                  {selectedPhotos.length > 0
                    ? "Selected Photo Share"
                    : "Gallery Share"}
                </h3>
                <p>
                  {eventConfig.hashtags
                    .map((hashtag) => `#${hashtag.replace(/^#/, "")}`)
                    .join(" ")}
                </p>
              </div>
              <button
                className="wds-copy-button"
                onClick={() => copyToClipboard(shareText, "copy-share-text")}
                type="button"
              >
                {copyStatus === "copy-share-text" ? "Copied" : "Copy text"}
              </button>
            </div>
            <textarea readOnly value={shareText} />
            <div className="wds-share-actions">
              <button
                className="wds-secondary-button"
                onClick={downloadSelectedPhotos}
                type="button"
              >
                Download selected photos
              </button>
              {shareChannels.map((channel) => (
                <button
                  className={
                    channel.id === "native"
                      ? "wds-copy-button"
                      : "wds-secondary-button"
                  }
                  key={channel.id}
                  onClick={() => openShareWindow(channel.id)}
                  type="button"
                >
                  {copyStatus === `channel-${channel.id}`
                    ? "Copied"
                    : channel.label}
                </button>
              ))}
            </div>
            <div className="wds-share-guidance">
              <h3>Sharing on LinkedIn</h3>
              <p>
                LinkedIn does not accept pre-attached photos through public
                share links. Use this tool to copy the suggested text, download
                the selected photos, open LinkedIn, and attach the photos in the
                LinkedIn composer.
              </p>
            </div>
            {copyStatus === "selection-limit" && (
              <p className="wds-share-note">
                Up to {maxSelectedPhotos} photos can be selected at once.
              </p>
            )}
            {copyStatus === "share-fallback" && (
              <p className="wds-share-note">
                Share text copied for your selected network.
              </p>
            )}
            {copyStatus === "download-empty" && (
              <p className="wds-share-note">
                Select up to {maxSelectedPhotos} photos before downloading.
              </p>
            )}
            {copyStatus === "download-started" && (
              <p className="wds-share-note">
                Download started. If your browser opens images in new tabs, use
                Save Image from those tabs.
              </p>
            )}
          </article>
        </div>
      </section>

      <footer className="wds-footer">
        <div className="wds-container wds-footer__inner">
          <div>
            <h2>{eventConfig.organizerName}</h2>
            <p>
              Part of UW-Madison, connecting leaders around business best
              practices and emerging technologies.
            </p>
          </div>
          <nav aria-label="Footer links">
            <a href={eventConfig.parentUrl}>{eventConfig.eventName}</a>
            <a href="https://uwebc.wisc.edu/event-calendar/">Event Calendar</a>
            <a href="mailto:info@uwebc.wisc.edu">info@uwebc.wisc.edu</a>
          </nav>
        </div>
      </footer>

      {selectedPhoto && selectedIndex !== null && (
        <div className="wds-lightbox" onClick={closeLightbox} role="dialog">
          <button
            aria-label="Close photo"
            className="wds-lightbox__close"
            onClick={closeLightbox}
            type="button"
          >
            X
          </button>

          <button
            aria-label="Previous photo"
            className="wds-lightbox__nav wds-lightbox__nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(-1);
            }}
            type="button"
          >
            Prev
          </button>

          <figure
            className="wds-lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedPhoto.full} alt={selectedPhoto.title} />
            <figcaption>
              <div>
                <strong>{selectedPhoto.title}</strong>
                <p>{selectedPhoto.caption}</p>
              </div>
              <div className="wds-lightbox__actions">
                <button
                  onClick={() =>
                    copyToClipboard(
                      getPhotoUrl(pageBaseUrl, selectedPhoto),
                      `link-${selectedPhoto.id}`,
                    )
                  }
                  type="button"
                >
                  {copyStatus === `link-${selectedPhoto.id}`
                    ? "Copied"
                    : "Copy link"}
                </button>
                <button
                  onClick={() => togglePhotoSelection(selectedPhoto.id)}
                  type="button"
                >
                  {selectedPhotoIds.includes(selectedPhoto.id)
                    ? "Selected"
                    : "Select"}
                </button>
                <a href={selectedPhoto.download}>Open image</a>
              </div>
            </figcaption>
          </figure>

          <button
            aria-label="Next photo"
            className="wds-lightbox__nav wds-lightbox__nav--next"
            onClick={(event) => {
              event.stopPropagation();
              movePhoto(1);
            }}
            type="button"
          >
            Next
          </button>
        </div>
      )}

      <div aria-live="polite" className="wds-sr-status">
        {copyStatus === "copy-error" ? "Copy failed" : ""}
      </div>
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="wds-site-header">
      <div className="wds-uw-bar">
        <a href="https://www.wisc.edu/">University of Wisconsin-Madison</a>
      </div>
      <div className="wds-brand-row">
        <a
          aria-label="UWEBC home"
          className="wds-crest"
          href="https://uwebc.wisc.edu/"
        >
          W
        </a>
        <a className="wds-site-title" href="https://uwebc.wisc.edu/">
          UWEBC
        </a>
        <nav aria-label="Primary navigation">
          <a href="https://uwebc.wisc.edu/events/">Events</a>
          <a href={eventConfig.parentUrl}>{eventConfig.eventName}</a>
          <a href="https://uwebc.wisc.edu/membership-benefits/">Membership</a>
          <a href="https://uwebc.wisc.edu/about/">About</a>
        </nav>
      </div>
    </header>
  );
}

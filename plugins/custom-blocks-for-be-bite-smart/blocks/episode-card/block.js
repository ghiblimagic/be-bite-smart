(function () {
  const { registerBlockType } = wp.blocks;
  const {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
  } = wp.blockEditor;
  const { PanelBody, TextControl, Button } = wp.components;
  const { __ } = wp.i18n;

  registerBlockType("custom/episode-card", {
    title: __("Video Episode", "custom-blocks"),
    category: "widgets",

    supports: {
      fontSize: true,
      color: {
        background: true,
        text: true,
      },
      spacing: {
        margin: true,
        padding: true,
      },
    },

    attributes: {
      episodeNumber: { type: "string", default: "" },
      title: { type: "string", default: "" },
      description: { type: "string", default: "" },
      vimeoUrlEn: { type: "string", default: "" },
      vimeoUrlEs: { type: "string", default: "" },
      thumbnailUrl: { type: "string", default: "" },
      thumbnailId: { type: "number" },
      downloadUrlEn: { type: "string", default: "" },
      downloadUrlEs: { type: "string", default: "" },
    },

    edit: ({ attributes, setAttributes }) => {
      const blockProps = useBlockProps();

      return wp.element.createElement(
        "div",
        blockProps,

        // Inspector Controls
        wp.element.createElement(
          InspectorControls,
          null,

          wp.element.createElement(
            PanelBody,
            { title: __("Video Settings", "custom-blocks") },

            wp.element.createElement(TextControl, {
              label: __("Vimeo URL (English)", "custom-blocks"),
              value: attributes.vimeoUrlEn,
              onChange: (val) => setAttributes({ vimeoUrlEn: val }),
              placeholder: "https://vimeo.com/123456789",
              help: __("Paste the full Vimeo URL", "custom-blocks"),
            }),
            wp.element.createElement(TextControl, {
              label: __("Vimeo URL (Spanish)", "custom-blocks"),
              value: attributes.vimeoUrlEs,
              onChange: (val) => setAttributes({ vimeoUrlEs: val }),
              placeholder: "https://vimeo.com/987654321",
              help: __("Paste the full Vimeo URL", "custom-blocks"),
            }),

            wp.element.createElement("hr", { style: { margin: "20px 0" } }),

            wp.element.createElement(
              "p",
              { style: { marginBottom: "8px", fontWeight: "500" } },
              __("Thumbnail Image", "custom-blocks"),
            ),
            wp.element.createElement(
              MediaUploadCheck,
              null,
              wp.element.createElement(MediaUpload, {
                onSelect: (media) =>
                  setAttributes({
                    thumbnailUrl: media.url,
                    thumbnailId: media.id,
                  }),
                allowedTypes: ["image"],
                value: attributes.thumbnailId,
                render: ({ open }) =>
                  wp.element.createElement(
                    "div",
                    null,
                    attributes.thumbnailUrl
                      ? wp.element.createElement(
                          "div",
                          null,
                          wp.element.createElement("img", {
                            src: attributes.thumbnailUrl,
                            alt: "Thumbnail preview",
                            style: { maxWidth: "100%", marginBottom: "8px" },
                          }),
                          wp.element.createElement(
                            Button,
                            {
                              onClick: open,
                              variant: "secondary",
                              style: { marginRight: "8px" },
                            },
                            __("Replace Image", "custom-blocks"),
                          ),
                          wp.element.createElement(
                            Button,
                            {
                              onClick: () =>
                                setAttributes({
                                  thumbnailUrl: "",
                                  thumbnailId: null,
                                }),
                              variant: "tertiary",
                              isDestructive: true,
                            },
                            __("Remove", "custom-blocks"),
                          ),
                        )
                      : wp.element.createElement(
                          Button,
                          { onClick: open, variant: "primary" },
                          __("Upload Thumbnail", "custom-blocks"),
                        ),
                  ),
              }),
            ),

            wp.element.createElement("hr", { style: { margin: "20px 0" } }),

            wp.element.createElement(
              "p",
              { style: { marginBottom: "8px", fontWeight: "500" } },
              __("Download Files", "custom-blocks"),
            ),
            wp.element.createElement(TextControl, {
              label: __("Download URL (English)", "custom-blocks"),
              value: attributes.downloadUrlEn,
              onChange: (val) => setAttributes({ downloadUrlEn: val }),
              placeholder: "Google Drive or Dropbox link",
              help: __(
                "Paste Google Drive, Dropbox, or direct download link",
                "custom-blocks",
              ),
            }),
            wp.element.createElement(TextControl, {
              label: __("Download URL (Spanish)", "custom-blocks"),
              value: attributes.downloadUrlEs,
              onChange: (val) => setAttributes({ downloadUrlEs: val }),
              placeholder: "Google Drive or Dropbox link",
              help: __(
                "Paste Google Drive, Dropbox, or direct download link",
                "custom-blocks",
              ),
            }),
          ),
        ),

        wp.element.createElement(
          "div",
          { className: "episode-editor-fields" },

          wp.element.createElement(
            "div",
            { className: "episode-editor-field" },
            wp.element.createElement("label", null, "Episode Number"),
            wp.element.createElement(
              "p",
              { className: "episode-field-hint" },
              "Just the number, e.g. 1",
            ),
            wp.element.createElement(TextControl, {
              placeholder: "e.g. 1",
              value: attributes.episodeNumber,
              onChange: (val) => setAttributes({ episodeNumber: val }),
            }),
          ),

          wp.element.createElement(
            "div",
            { className: "episode-editor-field" },
            wp.element.createElement("label", null, "Episode Title"),
            wp.element.createElement(
              "p",
              { className: "episode-field-hint" },
              "The full episode title, e.g. Respect the Bubble",
            ),
            wp.element.createElement(TextControl, {
              placeholder: "e.g. Respect the Bubble",
              value: attributes.title,
              onChange: (val) => setAttributes({ title: val }),
            }),
          ),

          wp.element.createElement(
            "div",
            { className: "episode-editor-field" },
            wp.element.createElement("label", null, "Lesson Description"),
            wp.element.createElement(
              "p",
              { className: "episode-field-hint" },
              "Short description shown below the title",
            ),
            wp.element.createElement(RichText, {
              tagName: "p",
              placeholder: "e.g. Introducing a dog's stress signals.",
              value: attributes.description,
              onChange: (val) => setAttributes({ description: val }),
            }),
          ),
        ),

        // Editor Preview
        wp.element.createElement(
          "div",
          { className: "video-preview-editor" },
          attributes.thumbnailUrl
            ? wp.element.createElement("img", {
                src: attributes.thumbnailUrl,
                alt: "Video thumbnail",
                style: {
                  maxWidth: "300px",
                  width: "100%",
                  height: "auto",
                  display: "block",
                },
              })
            : wp.element.createElement(
                "div",
                {
                  style: {
                    padding: "60px 20px",
                    background: "#f0f0f0",
                    textAlign: "center",
                    border: "2px dashed #ddd",
                  },
                },
                "Upload a thumbnail in the sidebar →",
              ),
        ),
      );
    },

    save: ({ attributes }) => {
      const blockProps = useBlockProps.save();

      // Extract Vimeo IDs from URLs
      const getVimeoId = (url) => {
        if (!url) return null;
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
      };

      // Convert Google Drive and Dropbox URLs to direct download links
      const convertToDirectDownload = (url) => {
        if (!url) return null;

        // Google Drive: https://drive.google.com/file/d/1ABC123XYZ/view
        //           → https://drive.google.com/uc?export=download&id=1ABC123XYZ
        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
        if (driveMatch) {
          return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
        }

        // Dropbox: ?dl=0 → ?dl=1
        if (url.includes("dropbox.com")) {
          if (url.includes("?dl=")) {
            return url.replace(/\?dl=0/, "?dl=1");
          } else if (url.includes("dl=0")) {
            return url.replace(/dl=0/, "dl=1");
          } else {
            return url + (url.includes("?") ? "&dl=1" : "?dl=1");
          }
        }

        return url;
      };

      const vimeoIdEn = getVimeoId(attributes.vimeoUrlEn);
      const vimeoIdEs = getVimeoId(attributes.vimeoUrlEs);
      const downloadUrlEn = convertToDirectDownload(attributes.downloadUrlEn);
      const downloadUrlEs = convertToDirectDownload(attributes.downloadUrlEs);

      return wp.element.createElement(
        "article",
        {
          ...blockProps,
          className: `${blockProps.className || ""} video-episode-block`.trim(),
          "data-vimeo-en": vimeoIdEn,
          "data-vimeo-es": vimeoIdEs,
        },

        // Card container
        // custom-block-card — shared card styles live in global CSS
        // custom-block-border — shared border styles live in global CSS
        wp.element.createElement(
          "div",
          {
            className:
              "episode-card-container custom-block-card custom-block-border",
          },

          // Thumbnail section
          wp.element.createElement(
            "div",
            { className: "episode-thumbnail-section" },
            wp.element.createElement(
              "div",
              // video-thumbnail-wrapper — shared video styles live in global CSS
              { className: "video-thumbnail-wrapper" },

              wp.element.createElement(
                "div",
                { className: "video-thumbnail" },
                attributes.thumbnailUrl &&
                  wp.element.createElement("img", {
                    src: attributes.thumbnailUrl,
                    alt: attributes.title || "Video thumbnail",
                    loading: "lazy",
                  }),
                // video-overlay — shared styles live in global CSS
                wp.element.createElement(
                  "div",
                  { className: "video-overlay" },
                  // play-button — shared styles live in global CSS
                  wp.element.createElement("button", {
                    className: "play-button",
                    "aria-label": "Play video",
                    type: "button",
                  }),
                ),
              ),

              // video-player — shared styles live in global CSS
              wp.element.createElement("div", { className: "video-player" }),
            ),
          ),

          // Content section
          wp.element.createElement(
            "div",
            { className: "episode-content-section" },

            attributes.title &&
              wp.element.createElement(
                "span",
                { className: "episode-number" },
                "Episode " + attributes.episodeNumber,
              ),

            attributes.title &&
              wp.element.createElement(RichText.Content, {
                tagName: "h3",
                className: "episode-title",
                value: attributes.title,
              }),

            attributes.description &&
              wp.element.createElement(RichText.Content, {
                tagName: "p",
                className: "episode-description",
                value: attributes.description,
              }),

            // Bottom controls
            wp.element.createElement(
              "div",
              { className: "episode-controls" },

              // Language Toggle
              wp.element.createElement(
                "div",
                {
                  className: "language-toggle-container",
                  "data-translate": "no",
                },
                wp.element.createElement(
                  "div",
                  { className: "language-toggle" },
                  wp.element.createElement("div", {
                    className: "toggle-slider",
                  }),
                  wp.element.createElement(
                    "div",
                    { className: "toggle-labels" },
                    wp.element.createElement(
                      "button",
                      {
                        className: "toggle-label active",
                        "data-lang": "en",
                        type: "button",
                      },
                      "EN",
                    ),
                    wp.element.createElement(
                      "button",
                      {
                        className: "toggle-label",
                        "data-lang": "es",
                        type: "button",
                      },
                      "ES",
                    ),
                  ),
                ),
              ),

              // Watch Now button
              wp.element.createElement(
                "button",
                { className: "watch-now-button", type: "button" },
                wp.element.createElement(
                  "span",
                  { className: "button-text" },
                  "Watch Now",
                ),
              ),

              // Download Buttons
              (downloadUrlEn || downloadUrlEs) &&
                wp.element.createElement(
                  "div",
                  { className: "download-buttons" },
                  downloadUrlEn &&
                    wp.element.createElement(
                      "a",
                      {
                        href: downloadUrlEn,
                        download: true,
                        className: "download-button",
                        "aria-label": "Download English version",
                      },
                      wp.element.createElement("span", null, "Download (EN)"),
                    ),
                  downloadUrlEs &&
                    wp.element.createElement(
                      "a",
                      {
                        href: downloadUrlEs,
                        download: true,
                        className: "download-button",
                        "aria-label": "Download Spanish version",
                      },
                      wp.element.createElement("span", null, "Download (ES)"),
                    ),
                ),
            ),
          ),
        ),
      );
    },
  });
})();

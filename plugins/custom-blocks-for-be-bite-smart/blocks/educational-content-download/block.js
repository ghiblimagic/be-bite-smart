(function () {
  const { registerBlockType } = wp.blocks;
  const { useBlockProps, InspectorControls, MediaUpload, RichText } =
    wp.blockEditor;
  const { PanelBody } = wp.components;
  const { __ } = wp.i18n;

  // Shared editor preview styles
  const previewStyles = {
    wrapper: {
      border: "1px solid #d0e4eb",
      borderRadius: "12px",
      overflow: "hidden",
      fontFamily: "Urbanist, sans-serif",
    },
    header: {
      padding: "14px 20px",
      background: "#f0f6f9",
      borderBottom: "1px solid #d0e4eb",
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },

    meta: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    episodeAndContentType: {
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: "#d4700a",
    },
    title: {
      fontSize: "17px",
      fontWeight: "800",
      color: "#1a2e35",
    },
    uploadArea: {
      padding: "16px 20px",
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
    },
    uploadGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    uploadLabel: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#6b7c84",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    fileChip: {
      fontSize: "12px",
      color: "#1a6e8a",
      background: "#e8f4f8",
      borderRadius: "6px",
      padding: "4px 10px",
      maxWidth: "200px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  registerBlockType("custom/educational-content-download", {
    title: "Educational Content Download",
    category: "widgets",
    icon: "download",
    description: "Displays an episode's downloadable PDF files.",

    supports: {
      spacing: { margin: true, padding: true },
    },

    attributes: {
      episodeNumber: { type: "string", default: "" },
      contentType: { type: "string", default: "" },
      episodeTitle: { type: "string", default: "" },
      pdfUrl: { type: "string", default: "" },
      pdfUrlEs: { type: "string", default: "" },
      // Unique ID so EN/ES viewers don't bleed across episodes on the same page
      blockId: { type: "string", default: "" },
    },

    edit: ({ attributes, setAttributes, clientId }) => {
      const blockProps = useBlockProps();

      // Auto-generate a stable blockId on first insert
      wp.element.useEffect(() => {
        if (!attributes.blockId) {
          setAttributes({ blockId: "ecd-" + clientId.slice(0, 8) });
        }
      }, []);

      return wp.element.createElement(
        "div",
        blockProps,

        // ── Sidebar ────────────────────────────────────────────────
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: "About this block", initialOpen: true },
            wp.element.createElement(
              "p",
              { style: { fontSize: "13px", color: "#50575e", margin: 0 } },
              "Edit the episode number, content type, title, and PDF files directly in the block below.",
            ),
          ),
        ),

        // ── Editor canvas ──────────────────────────────────────────
        wp.element.createElement(
          "div",
          { style: previewStyles.wrapper },

          // Header: num chip + orange label + title
          wp.element.createElement(
            "div",
            { style: previewStyles.header },

            wp.element.createElement(RichText, {
              tagName: "div",
              value: attributes.episodeNumber,
              onChange: (val) => setAttributes({ episodeNumber: val }),
              placeholder: "#",
              className: "bright-chip",
              style: { padding: "0 16px" },
              onSplit: () => {},
              disableLineBreaks: true,
            }),

            wp.element.createElement(
              "div",
              { style: previewStyles.meta },

              // "EPISODE X · " prefix (static) + editable content type
              wp.element.createElement(
                "div",
                {
                  style: { display: "flex", alignItems: "center", gap: "4px" },
                },
                wp.element.createElement(
                  "span",
                  { className: "capitalized-and-colored" },
                  attributes.episodeNumber
                    ? "EPISODE " + attributes.episodeNumber + " · "
                    : "EPISODE # · ",
                ),
                wp.element.createElement(RichText, {
                  tagName: "span",
                  value: attributes.contentType,
                  onChange: (val) => setAttributes({ contentType: val }),
                  placeholder: "Content type",
                  className: "capitalized-and-colored",
                  onSplit: () => {},
                  disableLineBreaks: true,
                }),
              ),

              wp.element.createElement(RichText, {
                tagName: "div",
                value: attributes.episodeTitle,
                onChange: (val) => setAttributes({ episodeTitle: val }),
                placeholder: "Episode title",
                style: previewStyles.title,
                onSplit: () => {},
                disableLineBreaks: true,
              }),
            ),
          ),

          // PDF upload area
          wp.element.createElement(
            "div",
            { style: previewStyles.uploadArea },

            // English PDF
            wp.element.createElement(
              "div",
              { style: previewStyles.uploadGroup },
              wp.element.createElement(
                "span",
                { style: previewStyles.uploadLabel },
                "English PDF",
              ),
              wp.element.createElement(MediaUpload, {
                onSelect: (media) => setAttributes({ pdfUrl: media.url }),
                allowedTypes: ["application/pdf"],
                value: attributes.pdfUrl,
                render: ({ open }) =>
                  wp.element.createElement(
                    "button",
                    { onClick: open, className: "button" },
                    attributes.pdfUrl
                      ? "Change English PDF"
                      : "Upload English PDF",
                  ),
              }),
              attributes.pdfUrl &&
                wp.element.createElement(
                  "span",
                  { style: previewStyles.fileChip },
                  attributes.pdfUrl.split("/").pop(),
                ),
            ),

            // Spanish PDF
            wp.element.createElement(
              "div",
              { style: previewStyles.uploadGroup },
              wp.element.createElement(
                "span",
                { style: previewStyles.uploadLabel },
                "Spanish PDF",
              ),
              wp.element.createElement(MediaUpload, {
                onSelect: (media) => setAttributes({ pdfUrlEs: media.url }),
                allowedTypes: ["application/pdf"],
                value: attributes.pdfUrlEs,
                render: ({ open }) =>
                  wp.element.createElement(
                    "button",
                    { onClick: open, className: "button" },
                    attributes.pdfUrlEs
                      ? "Change Spanish PDF"
                      : "Upload Spanish PDF",
                  ),
              }),
              attributes.pdfUrlEs &&
                wp.element.createElement(
                  "span",
                  { style: previewStyles.fileChip },
                  attributes.pdfUrlEs.split("/").pop(),
                ),
            ),
          ),
        ),
      );
    },

    save: ({ attributes }) => {
      const blockProps = useBlockProps.save();

      const blockId = attributes.blockId || "ecd-block";
      const enId = "ecd-en-" + blockId;
      const esId = "ecd-es-" + blockId;
      const groupId = "ecd-grp-" + blockId;

      const episodeAndContentType = [
        attributes.episodeNumber ? "Episode " + attributes.episodeNumber : "",
        attributes.contentType ? attributes.contentType : "",
      ]
        .filter(Boolean)
        .join(" · ");

      return wp.element.createElement(
        "div",
        {
          ...blockProps,
          className:
            (blockProps.className ? blockProps.className + " " : "") +
            "educational-content-download-block",
        },

        // Yellow number chip
        attributes.episodeNumber &&
          wp.element.createElement(
            "div",
            { className: "bright-chip" },
            attributes.episodeNumber,
          ),

        // Orange label + title
        wp.element.createElement(
          "div",
          { className: "ecd-header" },
          episodeAndContentType &&
            // Episode 1 · Coloring Book
            wp.element.createElement(
              "span",
              { className: "capitalized-and-colored ecd-title" },
              episodeAndContentType,
            ),
          attributes.episodeTitle &&
            // Respect The Bubble
            wp.element.createElement(RichText.Content, {
              tagName: "h3",
              className: "ecd-title",
              value: attributes.episodeTitle,
            }),
        ),

        // Toggle buttons
        (attributes.pdfUrl || attributes.pdfUrlEs) &&
          wp.element.createElement(
            "div",
            { className: "ecd-buttons" },
            attributes.pdfUrl &&
              wp.element.createElement(
                "button",
                {
                  className: "ecd-toggle",
                  "data-target": enId,
                  "data-group": groupId,
                  "data-expanded": "false",
                },
                "View PDF (English)",
              ),
            attributes.pdfUrlEs &&
              wp.element.createElement(
                "button",
                {
                  className: "ecd-toggle ecd-toggle--outline",
                  "data-target": esId,
                  "data-group": groupId,
                  "data-expanded": "false",
                },
                "View PDF (Spanish)",
              ),
          ),

        // PDF viewers — direct flex children so they naturally span full width
        attributes.pdfUrl &&
          wp.element.createElement(
            "div",
            { id: enId, className: "ecd-viewer" },
            wp.element.createElement("iframe", {
              "data-src": attributes.pdfUrl,
              width: "100%",
              height: "600px",
              title: "PDF Document (English)",
            }),
          ),

        attributes.pdfUrlEs &&
          wp.element.createElement(
            "div",
            { id: esId, className: "ecd-viewer" },
            wp.element.createElement("iframe", {
              "data-src": attributes.pdfUrlEs,
              width: "100%",
              height: "600px",
              title: "PDF Document (Spanish)",
            }),
          ),
      );
    },
  });
})();

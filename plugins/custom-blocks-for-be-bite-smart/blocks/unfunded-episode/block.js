(function () {
  var registerBlockType = wp.blocks.registerBlockType;
  var el = wp.element.createElement;
  var TextControl = wp.components.TextControl;
  var TextareaControl = wp.components.TextareaControl;
  var useBlockProps = wp.blockEditor.useBlockProps;

  registerBlockType("custom/unfunded-episode", {
    attributes: {
      episodeNumber: { type: "string", default: "" },
      title: { type: "string", default: "" },
      lesson: { type: "string", default: "" },
    },

    edit: function (props) {
      var attrs = props.attributes;
      var setAttrs = props.setAttributes;
      var blockProps = useBlockProps({ className: "unfunded-episode-card" });

      return el(
        "div",
        blockProps,
        el(
          "div",
          { className: "uec-inner" },

          // Thumbnail
          el(
            "div",
            { className: "uec-thumb" },
            el("span", { className: "uec-thumb-icon" }, "🎬"),
            el("span", { className: "uec-thumb-label" }, "Pending Funding"),
          ),

          // Editor fields + preview
          el(
            "div",
            { className: "uec-body" },
            el(
              "div",
              { className: "uec-fields" },
              el(TextControl, {
                label: "Episode Number",
                placeholder: "e.g. 3",
                value: attrs.episodeNumber,
                onChange: function (val) {
                  setAttrs({ episodeNumber: val });
                },
              }),
              el(TextControl, {
                label: "Title",
                placeholder: "e.g. Never Kiss a Dog on the Face",
                value: attrs.title,
                onChange: function (val) {
                  setAttrs({ title: val });
                },
              }),
              el(TextareaControl, {
                label: "Lesson",
                placeholder: "e.g. Never go face to face with a dog...",
                value: attrs.lesson,
                onChange: function (val) {
                  setAttrs({ lesson: val });
                },
              }),
            ),

            // Live preview
            el(
              "div",
              { className: "uec-preview" },
              el(
                "div",
                { className: "uec-ep-number" },
                attrs.episodeNumber
                  ? "Episode " + attrs.episodeNumber
                  : "Episode —",
              ),
              el(
                "div",
                { className: "uec-title" },
                attrs.title || "Title Pending",
              ),
              el(
                "div",
                { className: "uec-lesson" },
                attrs.lesson || "Lesson description will appear here.",
              ),
            ),
          ),

          el("span", { className: "uec-badge" }, "Needs Funding"),
        ),
      );
    },

    save: function (props) {
      var attrs = props.attributes;
      var blockProps = useBlockProps.save({
        className: "unfunded-episode-card",
      });

      return el(
        "div",
        blockProps,
        el(
          "div",
          { className: "uec-inner" },
          el(
            "div",
            { className: "uec-thumb", "aria-hidden": "true" },
            el("span", { className: "uec-thumb-icon" }, "🎬"),
            el("span", { className: "uec-thumb-label" }, "Pending Funding"),
          ),
          el(
            "div",
            { className: "uec-body" },
            el(
              "div",
              { className: "uec-ep-number" },
              attrs.episodeNumber
                ? "Episode " + attrs.episodeNumber
                : "Episode",
            ),
            el(
              "div",
              { className: "uec-title" },
              attrs.title || "Title Pending",
            ),
            el("div", { className: "uec-lesson" }, attrs.lesson),
          ),
          el(
            "span",
            {
              className: "uec-badge",
              "aria-label": "Unfunded episode",
            },
            "Needs Funding",
          ),
        ),
      );
    },
  });
})();

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

function bodyToHtml(value: string): string {
  const v = (value || "").trim();
  if (!v) return "";
  if (v.startsWith("<")) return v;
  return v
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => "<p>" + p.replace(/</g, "&lt;") + "</p>")
    .join("");
}

function Btn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-[13px] transition " +
        (active
          ? "bg-[#171717] text-white"
          : "text-black/55 hover:bg-black/[0.06] hover:text-black")
      }
    >
      {children}
    </button>
  );
}

export function BlogRichEditor({ value, onChange, className }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#f56616] underline" },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "Write the article body...",
      }),
    ],
    content: bodyToHtml(value),
    immediatelyRender: false,
    editorProps: {
      handleDOMEvents: {
        wheel: (_view, event) => {
          const scroller = document.querySelector(
            ".blog-dialog-scroll",
          ) as HTMLElement | null;
          if (!scroller) return false;
          scroller.scrollTop += event.deltaY;
          event.preventDefault();
          event.stopPropagation();
          return true;
        },
      },
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[280px] overflow-visible px-4 py-3 text-[15px] leading-7 text-[#171717] focus:outline-none " +
          "[&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-black/15 [&_td]:px-3 [&_td]:py-2 " +
          "[&_th]:border [&_th]:border-black/15 [&_th]:bg-black/[0.04] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="rounded-xl border border-black/10 bg-white px-4 py-8 text-sm text-black/40">
        Loading editor...
      </div>
    );
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-black/10 bg-white " +
        (className || "")
      }
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-black/[0.06] bg-[#faf9f7] px-2 py-1.5">
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={14} />
        </Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={14} />
        </Btn>

        <span className="mx-1 h-5 w-px bg-black/10" />

        <select
          className="h-8 rounded-md border-0 bg-transparent px-1 text-[12px] text-black/70 outline-none"
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : "p"
          }
          onChange={(e) => {
            const v = e.target.value;
            const chain = editor.chain().focus();
            if (v === "p") chain.setParagraph().run();
            else if (v === "h1") chain.toggleHeading({ level: 1 }).run();
            else if (v === "h2") chain.toggleHeading({ level: 2 }).run();
            else if (v === "h3") chain.toggleHeading({ level: 3 }).run();
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <select
          className="h-8 max-w-[120px] rounded-md border-0 bg-transparent px-1 text-[12px] text-black/70 outline-none"
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value;
            if (!v) editor.chain().focus().unsetFontFamily().run();
            else editor.chain().focus().setFontFamily(v).run();
          }}
        >
          <option value="">Font</option>
          <option value="Inter, system-ui, sans-serif">Inter</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Times New Roman', Times, serif">Times</option>
          <option value="'Courier New', monospace">Courier</option>
          <option value="Arial, Helvetica, sans-serif">Arial</option>
        </select>

        <input
          type="color"
          title="Text color"
          className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        <span className="mx-1 h-5 w-px bg-black/10" />

        <Btn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </Btn>
        <Btn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </Btn>
        <Btn
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={14} />
        </Btn>
        <Btn
          title="Strike"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={14} />
        </Btn>

        <span className="mx-1 h-5 w-px bg-black/10" />

        <Btn
          title="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={14} />
        </Btn>
        <Btn
          title="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={14} />
        </Btn>
        <Btn
          title="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={14} />
        </Btn>

        <span className="mx-1 h-5 w-px bg-black/10" />

        <Btn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </Btn>
        <Btn
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </Btn>
        <Btn
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={14} />
        </Btn>

        <span className="mx-1 h-5 w-px bg-black/10" />

        <Btn
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={14} />
        </Btn>
        <Btn
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={14} />
        </Btn>
        <Btn
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={14} />
        </Btn>

        <span className="mx-1 h-5 w-px bg-black/10" />

        <Btn title="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 size={14} />
        </Btn>
        <Btn title="Insert table" onClick={insertTable}>
          <TableIcon size={14} />
        </Btn>
        <Btn
          title="Clear formatting"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <RemoveFormatting size={14} />
        </Btn>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

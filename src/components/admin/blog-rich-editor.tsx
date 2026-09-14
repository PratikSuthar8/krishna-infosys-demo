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

const EDITOR_CSS = `
.blog-tiptap h1 { font-size: 1.75rem; font-weight: 700; line-height: 1.25; margin: 0.75rem 0 0.4rem; letter-spacing: -0.03em; }
.blog-tiptap h2 { font-size: 1.35rem; font-weight: 650; line-height: 1.3; margin: 0.65rem 0 0.35rem; letter-spacing: -0.025em; }
.blog-tiptap h3 { font-size: 1.15rem; font-weight: 600; line-height: 1.35; margin: 0.55rem 0 0.3rem; }
.blog-tiptap p { margin: 0.35rem 0; }
.blog-tiptap ul { list-style: disc; padding-left: 1.25rem; margin: 0.4rem 0; }
.blog-tiptap ol { list-style: decimal; padding-left: 1.25rem; margin: 0.4rem 0; }
.blog-tiptap blockquote { border-left: 3px solid #f56616; padding-left: 0.75rem; color: #555; margin: 0.5rem 0; }
.blog-tiptap table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; }
.blog-tiptap td, .blog-tiptap th { border: 1px solid rgba(0,0,0,0.15); padding: 0.4rem 0.65rem; }
.blog-tiptap th { background: rgba(0,0,0,0.04); text-align: left; font-weight: 600; }
`;

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
      onMouseDown={(e) => e.preventDefault()}
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
          "blog-tiptap max-w-none min-h-[280px] overflow-visible px-4 py-3 text-[15px] leading-7 text-[#171717] focus:outline-none",
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

  const setBlock = (kind: "p" | "h1" | "h2" | "h3") => {
    const chain = editor.chain().focus();
    if (kind === "p") chain.setParagraph().run();
    else if (kind === "h1") chain.setHeading({ level: 1 }).run();
    else if (kind === "h2") chain.setHeading({ level: 2 }).run();
    else if (kind === "h3") chain.setHeading({ level: 3 }).run();
  };

  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-black/10 bg-white " +
        (className || "")
      }
    >
      <style dangerouslySetInnerHTML={{ __html: EDITOR_CSS }} />

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
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => setBlock(e.target.value as "p" | "h1" | "h2" | "h3")}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <select
          className="h-8 max-w-[120px] rounded-md border-0 bg-transparent px-1 text-[12px] text-black/70 outline-none"
          defaultValue=""
          onMouseDown={(e) => e.preventDefault()}
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
          onMouseDown={(e) => e.preventDefault()}
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
          onClick={() => setBlock("h1")}
        >
          <Heading1 size={14} />
        </Btn>
        <Btn
          title="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => setBlock("h2")}
        >
          <Heading2 size={14} />
        </Btn>
        <Btn
          title="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => setBlock("h3")}
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

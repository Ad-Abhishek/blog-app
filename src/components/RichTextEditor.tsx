import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'color',
  'background',
  'blockquote',
  'code-block',
  'link',
];

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[300px] border rounded-md" />;
  }

  return (
    <div className={`rich-text-editor ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background"
      />
    </div>
  );
};

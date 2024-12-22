import axios from "axios";
import { useState } from "react";
import './markdown.css'
function MarkDown() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const handleChange = async (e) => {
    const value = e.target.value;
    setMarkdown(value);
    try {
      if(value){
        const response = await axios.post("api/markdownservice/convertToHtml", { content: value });
        setHtml(response.data.result);
      }else{
        setHtml("")
      }
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="editor">
          <h4>Editor</h4>
          <textarea
            value={markdown}
            onChange={handleChange}
            placeholder="Enter your text..."
          />
        </div>
       <div className="preview">
       <h4>Preview</h4>
        <div dangerouslySetInnerHTML={{ __html: html }} />
       </div>
      </div>
    </>
  );
}
export default MarkDown;

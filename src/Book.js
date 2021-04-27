import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import {
  useLocation,
  useRouteMatch,
  Link,
  useParams,
} from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {baseUrl} from './constants';
const Book = () => {
  const params = useParams();
  const location = useLocation()
  const book = location.state?.book;
  const chapter = location.state?.chapter;
  const [currentChapter,setCurrentChapter] = useState([]);
  let match = useRouteMatch();
   const [mybook,setMybook] = useState([]);
   const [edit,setEdit] = useState(false);
   const [ content,setContent]= useState(EditorState.createEmpty());
   const [git,setGit]=useState(book.pr);
   const [currentFile, setCurrentFile] = useState('');
   const [gitLocation, setGitLocation] = useState(book.location);
 useEffect(() => {
  if(book){
     fetch(book.location+book.entry)
       .then(res => res.json())
       .then(
         (result) => {
           setMybook(result);
               setCurrentFile(result[0].location);
               fetch(gitLocation+result[0].location)
                            .then(res => res.json())
                            .then(
                              (result) => {
                                setCurrentChapter(result);
                                 updateContent(result.content);
                              },
                              (error) => {

                              }
                            )
         },
         (error) => {

         }
       )
       }
   },[]);
    useEffect(() => {
             if(chapter){
             setCurrentFile(chapter.location);
             fetch(gitLocation+chapter.location)
                 .then(res => res.json())
                 .then(
                   (result) => {
                     setCurrentChapter(result);
                      updateContent(result.content);
                   },
                   (error) => {

                   }
                 )
                 }
      },[chapter]);
   const bookTOC = mybook.map((chapter) =>
<Nav defaultActiveKey="#" className="flex-column" key={chapter.slug} >
  <Link to={{ pathname:`${baseUrl}/book/${book.slug}/${chapter.slug}`, state:{chapter,book}}}>
                                                                         {chapter.name}
                                                                         </Link>
</Nav>);
const toggleEdit = () => {
setEdit(!edit);
}
const onEditorStateChange = (content) => {
   setContent(content);
}
const updateContent = (c) => {
setContent(EditorState.createWithContent(
                                             ContentState.createFromBlockArray(
                                                     convertFromHTML(c)
                                                   )
                                            ));
}
const save = () => {
const rawContentState = convertToRaw(content.getCurrentContent());
const markup = draftToHtml(
  rawContentState
);
 let newObject = { "authors": currentChapter.authors,
                   "content": markup };
textToClipboard(JSON.stringify(newObject, null, " "));
window.location.href = git+currentFile;
}
const textToClipboard = (text) => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
   return  (<div className="row"><div className="col-xl-2">{mybook.length > 0 && bookTOC}</div><div className="col-xl-8"><div><button onClick={toggleEdit}>{ edit ? 'Never Mind' : 'Improve this Doc' }</button></div>
  { currentChapter && !edit && (<div><span> Author: {currentChapter.authors}</span><p><div dangerouslySetInnerHTML={{__html: currentChapter.content}} /></p></div>) }
   { currentChapter && edit && (<div><Editor editorState={content} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={onEditorStateChange} /><button onClick={save}>Save</button></div>) }
  </div></div>);
}
export default Book;
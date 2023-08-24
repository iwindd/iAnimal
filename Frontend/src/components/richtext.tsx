import { Dispatch, SetStateAction} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './richtext.css'

function Index(props : {
    value : string,
    setValue : Dispatch<SetStateAction<string>>
}) {
    return <ReactQuill
        theme="snow"
        value={props.value}
        onChange={(e) => props.setValue(e)}
        modules={{
            toolbar: [
                [],
                ['bold', 'italic'],
                [],
            ],
        }}
    />;
}

export default Index
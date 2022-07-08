import styles from './EditPost.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');
  
  useEffect(() => {

    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      
      const textTags = post.tags.join(' ');

      setTags(textTags);
    }
  }, [ post ])
  

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    const tagsArray = tags.split(' ').map(tag => tag.trim().toLowerCase());

    if(!title || !image || !tags || !body || !tagsArray){
      setFormError('Por favor, preencha todos os campos!')
    }

    if(formError) return;

    const data = {
        title,
        image,
        body,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName
    }

    updateDocument(id, data);

    navigate('/dashboard');

  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar post</h2>
      <p>Escreva sobre o que quiser compartilhar.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name='title'
            required
            placeholder='Título do seu post'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name='image'
            required
            placeholder='Insira a url da sua imagem'
            onChange={e => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder='Insira o conteúdo do post'
            onChange={e => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name='tags'
            required
            placeholder='Insira as tags do post'
            onChange={e => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Postar!</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {(response.error || formError) && (<p className="error">{response.error || formError}</p>)}
      </form>
        </>
      )}
    </div>
  )
}

export default EditPost
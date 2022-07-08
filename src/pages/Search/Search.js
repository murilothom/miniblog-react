import styles from './Search.module.css';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// components
import PostDetail from '../../components/PostDetail';

import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get('q').toLowerCase();

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className={styles.search_container}>
      {posts && posts.length === 0 && <h2>Busca sem resultados</h2>}
      {posts && posts.length !== 0 && <h2>Resultados da sua busca</h2>}
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
          <p>Não foram encontrados posts a partir da sua busca...</p>
          <Link to='/' className='btn btn-dark'>Voltar para página inicial</Link>
          </div>
        )}
        {posts && posts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Search
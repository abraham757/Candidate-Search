type Props = {
  avatar_url: string; // URL del avatar del usuario
  login: string;      // Nombre de usuario (login)
  html_url: string;   // URL del perfil del usuario en GitHub
};

const UserCard: React.FC<Props> = ({ avatar_url, login, html_url }) => {
  return (
    <div className="user-card">
      <img src={avatar_url} alt={`${login}'s avatar`} />
      <h2>{login}</h2>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        Ver perfil
      </a>
    </div>
  );
};

export default UserCard;

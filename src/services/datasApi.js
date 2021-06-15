import md5 from 'crypto-js/md5';

export async function fetchToken() {
  const tokenApi = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(tokenApi);
    const token = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGravatar(email) {
  email = email.toLowerCase();
  email = email.replace(/\s/g, '');
  const hash = md5(email).toString();
  try {
    const gravatarAPI = `https://www.gravatar.com/avatar/${hash}`;
    const response = await fetch(gravatarAPI);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchQuest(seuTokenAqui) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${seuTokenAqui}`);
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function fetchOutraQuest(seuTokenAqui, quantidadeDePerguntasRetornadas) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${quantidadeDePerguntasRetornadas}&token=${seuTokenAqui}`);
  const data = await response.json();
  // console.log(data);
  return data;
}

// localStorage.setItem('', JSON.stringify());
// localStorage.getItem('');

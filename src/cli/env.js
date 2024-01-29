const parseEnv = () => {
  const envVars = Object.entries(process.env) ;
  for (let i = 0; i < envVars.length; i++) {
    if (envVars[i][0].startsWith('RSS_')) {
      console.log(`${envVars[i][0]}=${envVars[i][1]}`);
    }
  }
};

parseEnv();
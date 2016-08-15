module.exports = {
  rules:[
        {
          pattern:/\/api\/getLivelist.php\?rtype=origin$/,
          respondwith:"./beautylist.json"
        },
        {
          pattern:/\/api\/getLivelist.php\?rtype=more$/,
          respondwith:"./more-livelist.json"
        },
        {
          pattern:/\/api\/getLivelist.php\?rtype=refresh$/,
          respondwith:"./refresh-livelist.json"
        }
  ]
};

ACCENT='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "\n${ACCENT}rostock//ahoi${NC}"
echo -e "${ACCENT}CraftCMS 2 Boilerplate${NC}"
echo -e "${ACCENT}Johannes Ahrndt${NC}"


echo -e "\n${ACCENT}I am going to download and install CraftCMS 2 latest and set up a boilerplate. Should I start?${NC}"
select yn in "Yes" "Exit"; do
    case $yn in
        Yes ) break;;
        Exit ) exit;;
    esac
done

if [ -d "craft" ]; then
  echo -e "\n${ACCENT}CraftCMS seems to be installed in ./craft! Continue and overwrite previous installation?${NC}"
  select yn in "Yes" "Exit"; do
      case $yn in
          Yes ) break;;
          Exit ) exit;;
      esac
  done
fi

#
# Download CraftCMS 2 latest and unzip
#

echo -e "${ACCENT}Downloading CraftCMS 2 latest${NC}"
curl "http://craftcms.com/latest.zip?accept_license=yes" -o craft.zip -L

echo -e "${ACCENT}Unzipping CraftCMS 2 latest${NC}"
unzip -o -q craft.zip

rm ./craft.zip
rm ./readme.txt

mkdir ./public/assets
mkdir ./public/assets/css
mkdir ./public/assets/js
mkdir ./public/assets/fonts
mkdir ./public/assets/img
mkdir ./public/favicon

#
# CME
#

echo -e "${ACCENT}Initializing Git submodules${NC}"
git submodule init
# Remove files ./craft/config/general.php, ./craft/config/db.php and ./public/index.php and copy new ones
cp ./craft-multi-environment/craft/config/general.php ./craft/config/general.php
cp ./craft-multi-environment/craft/config/db.php ./craft/config/db.php
cp ./craft-multi-environment/public/index.php ./public/index.php
cp ./craft-multi-environment/example.env.php ./example.env.php
cp ./craft-multi-environment/example.env.php ./.env.php
cp ./craft-scripts/scripts/example.env.sh ./craft-scripts/scripts/.env.sh

#
# Node
#
echo -e "\n${ACCENT}Should I install Node dependencies?${NC}"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) npm install; break;;
        No ) break;;
    esac
done

echo -e "\n${GREEN}Please follow the further instructions in README.md!${NC}"
echo -e "${GREEN}Done${NC}"

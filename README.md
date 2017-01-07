#API REST using NodeJS
##Prerequisites
###npm >=2.15.9
```
sudo apt-get install npm
```
###nodejs >=4.6.1
```
sudo npm cache clean -f
sudo npm install -g n
sudo n 4.6.1
```

##Instalation
###If you use MongoDB locally:
```
Uncomment this line "//var mongodbUri = 'mongodb://localhost/bdbooks';"
Comment this "var mongodbUri = 'mongodb://fabian0007:fabian0007@ds157268.mlab.com:57268/bdbooks';"
sudo apt-get install -y mongodb-org
mkdir data
./mongod
npm install
npm start
```
###If you use mLab only run:
```
npm install
npm start
```

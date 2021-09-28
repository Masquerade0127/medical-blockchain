echo "Hello travelers, this is the script code to install smart contract written by Mr. Le Hai Trieu. glad to see you here :')"
echo "================="
echo "The contract used in this script is bloody contract, also develop by Mr. Le Hai Trieu"
echo "Travelers. Please, input chaincode version. I recommend using [hour].[date].[year] to specify version of contract, just like 1631.2809.2021"
echo "Mr. Trieu said that, just ensure that will be the unique version on the network :)"
read version

echo "chaincode name: blood"
echo "chaincode version: " $version

export chaincodeVersion=$name_$version
export chaincodeName="blood.tar.gz"
export chaincodePath="../bloody-blockchain/"

echo ${chaincodeVersion}
echo ${chaincodeName}
echo ${chaincodePath}

./network.sh down
./network.sh up createChannel

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

peer version

peer lifecycle chaincode package ${chaincodeName} --path ${chaincodePath} --lang node --label ${chaincodeName}_${chaincodeVersion}

echo "==================================== chaincode has been packaged ===================================="

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode install ${chaincodeName}

echo "==================================== chaincode has been installed on org1 ===================================="
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

peer lifecycle chaincode install ${chaincodeName}

echo "==================================== chaincode has been installed on org2 ===================================="

peer lifecycle chaincode queryinstalled

echo "Travelers. Please input package id. It's showing up in the line above"
echo "This step is very importance, please contact to Mr. Trieu if you need any support :)"
read packageID

export CC_PACKAGE_ID=${packageID}
echo ${packageID}

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name $name --version $version --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

echo "==================================== chaincode has been approved on org2 ===================================="

export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name $name --version $version --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

echo "==================================== chaincode has been approved on org1 ===================================="

peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name $name --version $version --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"

echo "==================================== chaincode has been commit on both org ===================================="

peer lifecycle chaincode querycommitted --channelID mychannel --name $name --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

echo "==================================== init chaincode ===================================="

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n $name --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"instantiate","Args":[]}'

echo "==================================== set data ===================================="

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n blood --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"createProfile","Args":["20033078","Trieu","25","19960327","AB","5"]}'

echo "==================================== query ===================================="

peer chaincode query -C mychannel -n blood -c '{"Args":["queryProfile", "20033078"]}'

echo "This is the end of tutorial, thank you for your efforts, Traveler. Have a good day :)"

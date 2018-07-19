# 베지아보카도 프론트엔드 테스터  

## Node.js + Express + Docker  

도커로 서버에 쉽게 배포되도록 빌드합니다.  
빌드가 완료된 도커 이미지를 서버에 배포하여 실행시키면, 포트 8080에 노드앱이 시작되는 것을 확인할 수 있습니다.  
이런 식으로 프론트엔드 개발 초안 페이지들을 확인합니다.  

### 실행 방법  

1. git clone https://github.com/veggieavocado/avocado-front-beta.git .  
2. 로컬 테스팅은:  
```
npm install
npm start
```
3. 서버 배포는:  
```
docker build -t va/frontbeta:1.0 .
docker run -d -p 8080:8080 --name frontbeta va/frontbeta:1.0
```

import os,json,re,requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE="https://www.ibunroku.com"
LIST=BASE+"/p4g/personas"
OUT="output"; IMG=os.path.join(OUT,"personas")
os.makedirs(IMG,exist_ok=True)
S=requests.Session();S.headers["User-Agent"]="Mozilla/5.0"

def get(url):
    return BeautifulSoup(S.get(url).text,"html.parser")

def download(imgsrc,name):
    if not imgsrc:return None
    url=urljoin(BASE,imgsrc)
    ext=os.path.splitext(url)[1] or ".webp"
    path=os.path.join(IMG,name+ext)
    if not os.path.exists(path):
        r=S.get(url)
        open(path,"wb").write(r.content)
    return path.replace("\\","/")

soup=get(LIST)
links=[]
for a in soup.find_all("a",href=True):
    h=a["href"]
    if re.fullmatch(r"/p4g/personas/[^/]+",h):
        links.append(urljoin(BASE,h))
links=sorted(set(links))
print("Found",len(links),"personas")
data=[]
for i,url in enumerate(links,1):
    print(i,url)
    sp=get(url)
    name=sp.find("h1").get_text(strip=True)
    arc=sp.find("h1").find_previous("p").get_text(strip=True)
    lvl=int(re.search(r'level\s+(\d+)',sp.get_text(" ",strip=True),re.I).group(1))
    img=sp.find("img",alt=name)
    imgpath=download(img["src"],re.sub(r'[^a-z0-9]+','_',name.lower()))
    aff={}
    for span in sp.find_all("span",class_="text-sm"):
        ss=span.find_all("span")
        if len(ss)==2:
            aff[ss[0].get_text(strip=True)]=ss[1].get_text(strip=True)
    stats={}
    for row in sp.select("div.flex.items-center.gap-2"):
        t=row.find("span",class_=re.compile("uppercase"))
        lab=row.find("span",class_="label")
        if t and lab:
            stats[t.text]=int(lab.text)
    data.append({
        "name":name,
        "slug":url.rstrip("/").split("/")[-1],
        "url":url,
        "arcana":arc,
        "level":lvl,
        "image":imgpath,
        "affinities":aff,
        "stats":stats
        })
json.dump(data,open(os.path.join(OUT,"personas.json"),"w",encoding="utf8"),ensure_ascii=False,indent=2)
print("Done")

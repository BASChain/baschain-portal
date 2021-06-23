# Publish Guide

## Publish Github

> update package.json version
>
> build:github
>
> backup github.io
>
> copy to baschain.github.io

```bash
yarn build:github

cd ../baschain.github.io && git tag -a v2.1.xx -m 'upd:backup'

git add . && git commit -am 'fixed: ....'

```

## Publish baschain.cn

> update package.json version
>
> build
>
> upload server
>
> serve backup
>
> unzip

```bash
yarn build:prod
yarn serve # test
node ci/deploy-zip.js

```

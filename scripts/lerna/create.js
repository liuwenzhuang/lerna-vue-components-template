'use strict'

const { camelCase, pick } = require('lodash')
const path = require('path')
const process = require('process')
const { spawn } = require('child_process')
const { copyFile, editPackageJson, clearDir } = require('./util')

const rootPath = path.resolve(__dirname, '../../')
const packagesPath = path.resolve(rootPath, './packages')

// TODO: change to your own scope
const scopeName = '@lwz-fe'

let packageName = process.argv[2]
let packageDirName

if (packageName.startsWith(`${scopeName}/`)) {
  packageDirName = packageName.split(`${scopeName}/`)[1]
} else {
  packageDirName = packageName
  packageName = `${scopeName}/${packageName}`
}

function rebuildYarnWorkspaces() {
  const yarn = spawn('yarn', {
    shell: true
  })
  yarn.stdout.on('data', data => {
    console.log(`${data}`)
  })
  yarn.stderr.on('data', err => {
    console.error(`${err}`)
  })
  yarn.on('close', code => {
    console.log(`rebuild yarn workspaces exited with codee ${code}`)
  })
}

function copyFiles(clearFirst) {
  if (clearFirst) {
    clearDir(path.resolve(packagesPath, `${packageDirName}/lib`))
  }

  copyFile(
    path.resolve(__dirname, '../vue/shims-tsx.d.ts'),
    path.resolve(packagesPath, `${packageDirName}/lib/shims-tsx.d.ts`)
  )

  copyFile(
    path.resolve(__dirname, '../vue/shims-vue.d.ts'),
    path.resolve(packagesPath, `${packageDirName}/lib/shims-vue.d.ts`)
  )

  copyFile(
    path.resolve(__dirname, '../typescript/tsconfig.json'),
    path.resolve(packagesPath, `${packageDirName}/tsconfig.json`)
  )

  let packageClassName = camelCase(packageDirName)
  packageClassName =
    packageClassName[0].toUpperCase() + packageClassName.slice(1)

  copyFile(
    path.resolve(__dirname, '../rollup/rollup.config.js'),
    path.resolve(packagesPath, `${packageDirName}/rollup.config.js`),
    data => {
      return data.replace('__PACKAGE_NAME__', packageClassName)
    }
  )

  copyFile(
    path.resolve(__dirname, '../vue/Template.vue'),
    path.resolve(packagesPath, `${packageDirName}/lib/${packageClassName}.vue`),
    data => {
      return data
        .replace(/__PACKAGE_CLASS_NAME__/g, packageClassName)
        .replace(/__PACKAGE_NAME__/g, packageDirName)
    }
  )

  copyFile(
    path.resolve(__dirname, '../vue/index.ts'),
    path.resolve(packagesPath, `${packageDirName}/lib/index.ts`),
    data => {
      return data
        .replace(/__PACKAGE_CLASS_NAME__/g, packageClassName)
        .replace(/__PACKAGE_NAME__/g, packageDirName)
    }
  )

  const rootPackageJson = require(`${rootPath}/package.json`)
  const devDependencies = rootPackageJson.devDependencies
  editPackageJson(
    path.resolve(packagesPath, `${packageDirName}/package.json`),
    {
      scripts: {
        prepublish: 'rimraf dist && yarn build',
        build: 'yarn build:umd & yarn build:es & yarn build:unpkg',
        'build:umd': `rollup --config rollup.config.js --format umd --file dist/${packageDirName}.umd.js`,
        'build:es': `rollup --config rollup.config.js --format es --file dist/${packageDirName}.esm.js`,
        'build:unpkg': `rollup --config rollup.config.js --format iife --file dist/${packageDirName}.min.js`
      },
      main: `dist/${packageDirName}.umd.js`,
      module: `dist/${packageDirName}.esm.js`,
      unpkg: `dist/${packageDirName}.min.js`,
      types: 'dist/index.d.ts',
      files: ['dist'],
      publishConfig: {
        registry: 'https://registry.npmjs.org/',
        access: 'public'
      },
      devDependencies: pick(devDependencies, ['rimraf', 'rollup'])
    }
  )

  rebuildYarnWorkspaces()
}

if (process.argv[3] === 'onlyCopy') {
  copyFiles(false)
} else {
  const create = spawn('lerna', ['create', packageName, '-y'], {
    shell: true
  })

  create.stdout.on('data', data => {
    console.log(`${data}`)
  })
  create.stderr.on('data', err => {
    console.error(`${err}`)
  })
  create.on('close', code => {
    console.log(`lerna create ${packageName} exited with code ${code}`)
    if (code === 0) {
      copyFiles(true)
    }
  })
}

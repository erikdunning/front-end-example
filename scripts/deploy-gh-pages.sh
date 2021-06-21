#!/bin/bash
home=`pwd`
repo=${REPOSITORY_NAME}
tmpdir=`mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir'`
status=0
if [[ -z "${GITHUB_HEAD_REF}" ]]; then
  branch=${GITHUB_REF#refs/heads/}
else
  branch=${GITHUB_HEAD_REF}
fi

branch="gh-pages"

echo "Branch: ${branch}"

setup_tmp_environment() {
  # Setup Deploy Directory
  cd $tmpdir
  mkdir $repo
  cd $repo
  git init
  git config --global user.email "erikdunning@gmail.com"
  git remote add origin ${GH_TOKEN}@github.com:erikdunning/${repo}.git
  
  # Copy Down Build Files
  cd $home
  cp -rf ./build ${tmpdir}/${repo}/docs

  # Temp Environment Setup Complete
  cd ${tmpdir}/${repo}
}

commit_files() {
  git add .
  git commit --message "GitHub Run Number: $GITHUB_RUN_NUMBER"
}

upload_files() {
  git push -f --quiet origin $branch
  status=$?
}

teardown_tmp_environment() {
  cd ~
  rm -rf $tmpdir
}

setup_tmp_environment
commit_files
upload_files
teardown_tmp_environment

exit $status

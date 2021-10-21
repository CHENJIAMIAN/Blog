#!/usr/bin/python
# -*- coding: utf-8 -*-

from github import Github
from github.Issue import Issue
from github.Repository import Repository
import os
import time
import urllib.parse
import codecs
# from nasa_client import NasaClient
# from word_cloud import WordCloudGenerator

user: Github
username: str
Blog: Repository
cur_time: str


def format_issue(issue: Issue):
    return '- [%s](%s)  %s  \t \n' % (
        issue.title, issue.html_url, sup('%s :speech_balloon:' % issue.comments))


def sup(text: str):
    return '<sup>%s</sup>' % text


def sub(text: str):
    return '<sub>%s</sub>' % text


def update_readme_md_file(contents):
    with codecs.open('README.md', 'w', encoding='utf-8') as f:
        f.writelines(contents)
        f.flush()
        f.close()


def login():
    global user, username
    github_repo_env = os.environ.get('GITHUB_REPOSITORY')
    username = github_repo_env[0:github_repo_env.index('/')]
    password = os.environ.get('GITHUB_TOKEN')
    user = Github(username, password)


def get_Blog():
    global Blog
    Blog = user.get_repo(os.environ.get('GITHUB_REPOSITORY'))


def bundle_summary_section():
    global Blog
    global cur_time
    global user
    global username

    total_label_count = Blog.get_labels().totalCount
    total_issue_count = Blog.get_issues().totalCount

    # pic_of_the_day = NasaClient().get_picture_of_the_day()

    summary_section = '''

<p align='center'>
    <img src="https://badgen.net/badge/labels/{1}"/>
    <img src="https://badgen.net/github/issues/{0}/Blog"/>
    <img src="https://badgen.net/badge/last-commit/{2}"/>
    <img src="https://badgen.net/github/forks/{0}/Blog"/>
    <img src="https://badgen.net/github/stars/{0}/Blog"/>
    <img src="https://badgen.net/github/watchers/{0}/Blog"/>
    <img src="https://badgen.net/github/release/{0}/Blog"/>
</p>

<p align='center'>
    <a href="https://github.com/CHENJIAMIAN/visitor-count-badge">
        <img src="https://visitor-badge.glitch.me/badge?page_id=CHENJIAMIAN.Blog"/>
    </a>
</p>

'''.format(username, total_label_count, cur_time)

    return summary_section


def bundle_pinned_issues_section():
    global Blog

    pinned_label = Blog.get_label('置顶')
    pinned_issues = Blog.get_issues(labels=(pinned_label,))

    pinned_issues_section = '\n## 置顶 \n'

    for issue in pinned_issues:
        pinned_issues_section += format_issue(issue)

    return pinned_issues_section


def format_issue_with_labels(issue: Issue):
    global user, username

    labels = issue.get_labels()
    labels_str = ''

    for label in labels:
        labels_str += '[%s](https://github.com/%s/Blog/labels/%s), ' % (
            label.name, username, urllib.parse.quote(label.name))

    # issue.body[:150]

    return '''
#### [{0}]({1}) {2} 

'''.format(issue.title, issue.html_url, sup('%s :speech_balloon:' % issue.comments), issue.created_at, labels_str[:-2])


def bundle_new_created_section():
    global Blog

    new_5_created_issues = Blog.get_issues()

    new_created_section = '## 所有 \n'

    for issue in new_5_created_issues:
        new_created_section += format_issue_with_labels(issue)

    return new_created_section


def bundle_list_by_labels_section():
    global Blog
    global user

    # word cloud
    wordcloud_image_url = ''
    # WordCloudGenerator(Blog).generate()

    list_by_labels_section = """
## 分类
"""

    all_labels = Blog.get_labels()

    for label in all_labels:
        temp = ''
        # 这里的count是用来计算该label下有多少issue的, 按理说应该是取issues_in_label的totalCount, 但是不知道为什么取出来的一直都是
        # 所有的issue数量, 之后再优化.
        count = 0
        issues_in_label = Blog.get_issues(labels=(label,))
        for issue in issues_in_label:
            temp += format_issue(issue)
            count += 1

        list_by_labels_section += '''
<details>
<summary>%s\t<sup>%s:newspaper:</sup></summary>

%s

</details>
''' % (label.name, count, temp)

    list_by_labels_section += """
"""
    return list_by_labels_section


def bundle_cover_image_section() -> str:
    global Blog
    cover_label = Blog.get_label('封面')
    if cover_label is None:
        return ''
    cover_issues = Blog.get_issues(labels=(cover_label,))
    if cover_issues is None or cover_issues.totalCount == 0:
        return ''
    comments = cover_issues[0].get_comments()
    if comments is None or comments.totalCount == 0:
        return ''
    c = comments[comments.totalCount - 1]
    img_md = None
    img_desc = ''
    if '---' in c.body:
        img_md = c.body.split('---')[0]
        img_desc = c.body.split('---')[1]
    else:
        img_md = c.body
    if img_md is None:
        return ''
    img_url = img_md[(img_md.index('(') + 1):img_md.index(')')]
    print(img_url)
    return '''

<p align='center'>
<a href='{0}'>
<img src='{1}' width='50%' alt='{2}'>
</a>
</p>
<p align='center'>
<span>{2}</span>
</p>

    '''.format(c.html_url, img_url, img_desc)


def bundle_projects_section() -> str:
    global Blog, username
    project_label = Blog.get_label('开源')
    if not project_label:
        return ''
    issues = Blog.get_issues(labels=(project_label,))
    if not issues or issues.totalCount == 0:
        return ''
    content = ''
    for (idx, i) in enumerate(issues):
        content += '''
| [{1}](https://github.com/{0}/{1}) | {2} | ![](https://badgen.net/github/stars/{0}/{1}) ![](https://badgen.net/github/forks/{0}/{1}) ![](https://badgen.net/github/watchers/{0}/{1}) |'''.format(
            username, i.title, i.body)
        if idx == 0:
            content += '\n| --- | --- | --- |'
    return '''
# 开源项目

{}

'''.format(content)


def execute():
    global cur_time
    # common
    cur_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    # 1. login
    login()

    # 2. get Blog
    get_Blog()

    # 3. summary section
    summary_section = bundle_summary_section()
    print(summary_section)

    # 4. pinned issues section
    pinned_issues_section = bundle_pinned_issues_section()
    print(pinned_issues_section)

    # 5. new created section
    new_created_section = bundle_new_created_section()
    print(new_created_section)

    # 6. list by labels section
    list_by_labels_section = bundle_list_by_labels_section()
    print(list_by_labels_section)

    # 7. cover image section
    cover_image_section = bundle_cover_image_section()
    print(cover_image_section)

    # 8. projects section
    projects_section = bundle_projects_section()
    print(projects_section)

    # 9. about me section
    # about_me_section = bundle_about_me_section()
    # print(about_me_section)

    contents = [summary_section, cover_image_section, pinned_issues_section, new_created_section,
                list_by_labels_section, projects_section]
    update_readme_md_file(contents)

    print('README.md updated successfully!!!')


if __name__ == '__main__':
    execute()

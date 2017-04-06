import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys, driver } from './selenium'
import common from './common'

describe('HW6 front-end E2E article testing', () => {
    it('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should Create a new article and validate the article appears in the feed', (done) => {
        let countArticle
        const content = "a new post article" 
        sleep(500)
            .then(driver.findElements(By.css('[class="panel panel-default article"]'))
                .then(nodes => {
                    countArticle = nodes.length
                    expect(countArticle).to.be.at.least(1)
                }))
            .then(findId('inputArticle').clear())
            .then(findId('inputArticle').sendKeys(content))
            .then(findId('postArticleBtn').click())
            .then(sleep(1000))
            .then(driver.findElements(By.css('[class="panel panel-default article"]'))
                .then(nodes => {
                    expect(nodes.length).to.equal(countArticle + 1)
                })) 
            .then(done)

    })

    it('should Edit an article and validate the article text has updated', (done) => {
        const date = new Date()
        const oldContent = `${date}: test for editing`
        const newContent = `${date}: successful edit`
        sleep(500)
            .then(findId('inputArticle').clear())
            .then(findId('inputArticle').sendKeys(oldContent))
            .then(findId('postArticleBtn').click())
            .then(sleep(1000))
            .then(findId('inputSearch').clear())
            .then(findId('inputSearch').sendKeys(oldContent))
            .then(findId('btnSearchPost').click())
            .then(sleep(1000))
            .then(driver.findElements(By.css('[class="panel panel-default article"]'))
                .then(articles => {
                    expect(articles.length).to.equal(1)
                }))
            .then(sleep(500))
            .then(findCSS('[class="card-user-content"]').clear())
            .then(findCSS('[class="card-user-content"]').sendKeys(newContent))
            .then(findCSS('[class="btn btn-sm btn-default pull-right editArticleBtn"]').click())
            .then(sleep(1000))
            .then(findId('inputSearch').clear())
            .then(findId('inputSearch').sendKeys(newContent))
            .then(findId('btnSearchPost').click())
            .then(sleep(1000))
            .then(driver.findElements(By.css('[class="panel panel-default article"]'))
                .then(articles => {
                    expect(articles.length).to.equal(1)
                }))
            .then(done)
    })

    it('should Count the number of followed users', (done) => {
        sleep(500)
        .then(driver.findElements(By.css('[class="friend-list"]'))
            .then(followers => {
                expect(followers.length).to.be.at.least(1)
            }))
        .then(done)
    })

    it('Add the user "Follower" to the list of followed users' 
    +'and verify the count increases by one', (done) => {
        let newNumFollowers, oldNumFollowers
        const username = "Follower"
        sleep(500)
        .then(driver.findElements(By.css('[class="friend-list"]'))
            .then(followers => {
                oldNumFollowers = followers.length
            }))
        .then(findId('addUser').clear())
        .then(findId('addUser').sendKeys(username))
        .then(findId('btnAddStatus').click())
        .then(sleep(1500))
        .then(driver.findElements(By.css('[class="friend-list"]'))
            .then(followers => {
                newNumFollowers = followers.length
                expect(newNumFollowers).to.equal(oldNumFollowers + 1)
            }))
        .then(done)
    })

    it('Remove the user "Follower" from the list of followed' 
    + 'users and verify the count decreases by one', (done) => {
        let oldNumFollowers, newnumFollowers
        const username = 'Follower'
        sleep(500)
        .then(driver.findElements(By.css('[class="friend-list"]'))
            .then(followers => {
                console.log(followers.length)
                oldNumFollowers = followers.length
            }))
        .then(findId(`${username}`).findElements(By.css('[class="glyphicon glyphicon-remove del"]'))
            .then(dels => {
                dels[0].click()
            }))
        .then(sleep(500))
        .then(driver.findElements(By.css('[class="friend-list"]'))
            .then(followers => {
                expect(followers.length).to.equal(oldNumFollowers - 1)
            }))
        .then(done)
    })

    it('Search for "Only One Article Like This" and verify only one article shows,'
    +' and verify the author', (done) => {
        const date = new Date()
        
        const keyword = `${date} Only One Article Like This`
        sleep(500)
        .then(findId('inputArticle').clear())
        .then(findId('inputArticle').sendKeys(keyword))
        .then(findId('postArticleBtn').click())
        .then(sleep(1000))
        .then(findId('inputSearch').clear())
        .then(findId('inputSearch').sendKeys(keyword))
        .then(findId('btnSearchPost').click())
        .then(sleep(1000))
        .then(driver.findElements(By.css('[class="panel panel-default article"]'))
            .then(articles => {
                expect(articles.length).to.equal(1)
                
            }))
        .then(findCSS('[class="lead card-user-name"]').getText()
            .then(text => {
                expect(text).to.equal("zl52test")
            }))
        .then(done)

    })

    it('should log out', (done) => {
        common.logout().then(done)
    })
})
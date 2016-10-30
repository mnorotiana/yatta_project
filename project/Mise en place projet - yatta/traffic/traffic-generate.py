from threading import Thread
import requests, time

class MyThread(Thread):

    def __init__(self, val):
        ''' Constructor. '''

        Thread.__init__(self)
        self.val = val


        def run(self):
            for i in range(1, self.val):
                print('Value %d in thread %s' % (i, self.getName()))
                secondsToSleep = 120
                print('%s sleeping fo %d seconds...' % (self.getName(), secondsToSleep))
                time.sleep(secondsToSleep)


if __name__ == '__main__':
    fname = 'domains'
    myThreadOb1 = MyThread(4)
    myThreadOb1.setName('Thread 1')
    with open('./site') as f:
        url = f.read().splitlines()
        for j in url:
            try:
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
                response = requests.get("http://"+j, headers=headers)
                print(response.content)
                myThreadOb1.start()
            except Exception:
                pass



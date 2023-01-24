/*
Vladimir Poplavskij. Wykladowca
* -----------------
* Minimalna tablica monet, które tworzą daną wartość. Backtracking
* -----------------
2022-10-15
*/

#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

#define MAX 100000

int dp[MAX + 1];

void dpset(int value, int n);
void sset(int S[], int value, int n);
int min(int a, int b);
void coinChange(int coinList[], int n, int value, int S[], int count);
int countMinCoins(int coinList[], int value, int n);

int main(void) {
   int coins[] = {1, 2, 5};
   int n = 3, value, S[MAX], count = 0;

   do {
     printf("Wprowadzenie n. Musi byc != 0 \n");
     scanf("%d", &value);
   } while (value <= 0);

   printf("Wartosc: %d\nMonety: ", value);
   for (int i = 0; i < n; i++) {
      printf("%d, ", coins[i]);
   }
   printf("\n");

   dpset(-1, (int)(sizeof(dp) / sizeof(dp[0])));
   int isPossible = countMinCoins(coins, value, n);
   if (isPossible != INT_MAX) {
	  sset(S, 0, (int)(sizeof(S) / sizeof(S[0])));
	  //coinChange(coins, value, n, S, count);
      printf("Minimalna ilosc monet potrebna: %d\n", isPossible);
   } else {
     printf("Niemozliwe podzielic wartosci na dane monety\n");
   }
   return 0;
}

void dpset(int value, int n) {
    for (int i=0; i < n; i++) {
       dp[i] = value;
    }
}

void sset(int S[], int value, int n) {
    for (int i=0; i < n; i++) {
       S[i] = value;
    }
}

int min(int a, int b) {
    if (a <= b) {
        return a;
    }
    return b;
}

int countMinCoins(int coinList[], int value, int n){
    if (value == 0) {
        dp[0] = 0;
        return 0;
    }

    if (dp[value] != -1) {
        return dp[value];
    }

    int ret = INT_MAX;

    for (int i = 0; i < n; i++) {
        if (coinList[i] <= value) {

            int x = countMinCoins(coinList, value - coinList[i], n);

            if (x != INT_MAX) {
                ret = min(ret, 1 + x);
            }
        }
    }
    dp[value] = ret;
    return ret;
}

void coinChange(int coinList[], int n, int value, int S[], int count) {
  for (int i = 0; i < n; i++) {
        if (value - coinList[i] >= 0 && dp[value - coinList[i]] + 1 == dp[value]) {
            S[count] = coinList[i];
            count++;
            coinChange(coinList, n, value - coinList[i], S, count);
            break;
        }
  }
}
